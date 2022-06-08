"use-strict";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import http from "http";
import cookie from "cookie";
import { mkdirSync, renameSync, readdirSync, statSync } from "fs";

//@ts-ignore
import siofu from "socketio-file-upload";

import { Server } from "socket.io";

import { writeFileSync, existsSync } from "fs";
import { randomBytes } from "crypto";

import { login, register } from "./auth";
import { jwtverifyAsync } from "./crypto";
import { generateScoreboard, getScoreboardData, updateScoreboard } from "./database";
import { SocketNamespace } from "./socketnamespace";

interface LooseObject {
	[key: string]: any;
}

const dirname = process.cwd();

// TODO : Refactor this.
if (!existsSync("./.env")) {
	const SECRET = randomBytes(64).toString("hex");
	writeFileSync("./.env", `TOKEN_SECRET=${SECRET}`);
}

// get config vars
dotenv.config();

const port = 80; // TODO : Move to config

const app = express();

const server = http.createServer(app);
const io = new Server(server);

// WS(S) server
const namespaces: LooseObject = {};
const gengetNamespace = async (serial: string, allowGeneration: boolean) => {
	if (!namespaces[serial]) {
		let reply = await getScoreboardData(serial);
		if (!reply.length && allowGeneration) {
			reply = await generateScoreboard(serial);
		}

		namespaces[serial] = new SocketNamespace(serial, reply[0]);
	}
	return namespaces[serial];
};

io.on("connection", async (socket: any) => {
	const cookief = socket.handshake.headers.cookie;
	const cookies = cookief ? cookie.parse(socket.handshake.headers.cookie) : {};
	console.log(socket.id, "Connection made to websocket");

	socket.on("echo", (...args: any[]) => {
		console.log("echo", ...args);
		socket.emit("echo", ...args);
	});

	socket.on("data", async (serial: any) => {
		//When display sends serial number over wss.
		console.log(socket.id, "SERIAL :", serial);
		if (!serial) {
			return;
		}
		socket.serial = serial;
		const ns = await gengetNamespace(serial, true);
		ns.addDisplay(socket);
	});

	socket.on("input", (type: any, value: any) => {
		//When user sends input
		console.log("Input received", type, value);
		if (type === undefined || value === undefined) {
			console.log("No type or value");
			return;
		}

		if (!socket.auth) {
			console.log("No auth");
			return;
		}

		if (!socket.body) {
			console.log("No body");
			return;
		}

		const scoreboardSocket = namespaces[body.serial];
		if (!scoreboardSocket) {
			console.log("No scoreboard");
			return;
		}

		console.log(type, value);
		switch (type) {
			case "1B": {
				scoreboardSocket.data.hb = value;
				scoreboardSocket.emitDisplays("data", "#hb", "attr", "style", `fill:${value}`);
				break;
			}
			case "2B": {
				scoreboardSocket.data.ub = value;
				scoreboardSocket.emitDisplays("data", "#ub", "attr", "style", `fill:${value}`);
				break;
			}
			case "1O": {
				scoreboardSocket.data.ho = value;
				scoreboardSocket.emitDisplays("data", "#ho", "attr", "style", `fill:${value}`);
				break;
			}
			case "2O": {
				scoreboardSocket.data.uo = value;
				scoreboardSocket.emitDisplays("data", "#uo", "attr", "style", `fill:${value}`);
				break;
			}
			case "screen": {
				//NYI
				break;
			}
			case "message": {
				scoreboardSocket.data.message = value;
				scoreboardSocket.emitDisplays("data", "#message", "text", value);
				break;
			}
			case "timer": {
				scoreboardSocket.data.timer = value;
				scoreboardSocket.emitDisplays("data", "#timer", "text", value);
				break;
			}
			case "G1": {
				if (value === "reset") {
					scoreboardSocket.data.t1 = 0;
				} else {
					scoreboardSocket.data.t1 += value;
				}
				scoreboardSocket.emitDisplays("data", "#t1", "text", scoreboardSocket.data.t1);
				break;
			}
			case "G2": {
				if (value === "reset") {
					scoreboardSocket.data.t2 = 0;
				} else {
					scoreboardSocket.data.t2 += value;
				}
				scoreboardSocket.emitDisplays("data", "#t2", "text", scoreboardSocket.data.t2);
				break;
			}
			default: {
				console.log("No type");
				break;
			}
		}
		scoreboardSocket.emitUsers("state", scoreboardSocket.data);
		updateScoreboard(scoreboardSocket.serial, scoreboardSocket.data);
	});

	const { valid, body } = await jwtverifyAsync(cookies.bearer);
	socket.auth = valid;
	socket.body = body;
	console.log(socket.id, "JWT :", valid, body);
	if (socket.auth && body.serial) {
		let uploadDetails: any = {
			gotten: false,
			folder: "",
			name: "",
		};

		try {
			console.log("making dir");
			mkdirSync(`www/${body.serial}`);
		} catch (err) {
			console.log("dir exists");
		}

		socket.on("upload", (folder: string, name: string) => {
			if (folder.includes(".")) {
				console.log("NO");
				return;
			}
			let fulln = folder + name;
			if (fulln.includes("/") || fulln.includes("\\") || fulln.includes("..")) {
				console.log("NO");
				return;
			}

			uploadDetails = {
				gotten: true,
				folder: folder,
				name: name,
			};

			try {
				console.log("making dir");
				mkdirSync(`www/${body.serial}/${folder}`);
			} catch (err) {
				console.log("dir exists");
			}
		});

		const ns = await gengetNamespace(body.serial, true);
		ns.addUser(socket);

		const uploader = new siofu();
		uploader.dir = `www/${body.serial}`;
		uploader.on("saved", (data: any) => {
			console.log(data, uploadDetails);
			const { gotten, folder, name } = uploadDetails;
			if (gotten && folder && name) {
				try {
					const from = data.file.pathName;
					const to = `www/${body.serial}/${uploadDetails.folder}/${uploadDetails.name}.${data.file.name.split(".").pop()}`;
					console.log(from, to);
					renameSync(from, to);
				} catch (e) {
					console.log(e);
				}
			}
		});
		uploader.on("error", function (event: any) {
			console.log("Error from uploader", event);
		});
		uploader.listen(socket);
	}
});

// HTTP(S) webserver
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(siofu.router);

//DEFINE API ROUTES BELOW !!!
app.get("/status", async (req, res) => {
	const token = req.cookies?.bearer;
	const { valid, body } = await jwtverifyAsync(token);

	console.log(valid, body);

	if (valid) {
		res.status(200);
		res.send(body);
		return;
	}

	res.status(401);
	res.send({ username: "N/A", serial: "N/A", isAdmin: false });
});

app.post("/auth", login);

app.post("/register", async (req: Request, res: Response) => {
	console.log("Got register request");
	const { username, password, serial } = req.body;
	if (!(username && password && serial)) {
		console.log("Missing params on register");
		res.status(400); // Bad Request
		res.send("Invalid / Missing username, password and/or serialnumber");
		return;
	}

	console.log("Register attempt");
	if (await register(req, res)) {
		console.log("Login attempt post register");

		if (await login(req, res)) {
			console.log("Login successful");
		} else {
			console.log("Login failed, CODE ISSUE!");
		}
	} else {
		console.log("Register failed");
	}
});

app.get("/logout", (req, res) => {
	res.clearCookie("bearer");
	res.clearCookie("auth");
	res.redirect("/");
});

app.get("/sponsors", async (req, res) => {
	const queryParams = req.query;
	const { serial } = queryParams;
	if (!serial) {
		res.status(400);
		res.send("Invalid / Missing serialnumber");
		return;
	}

	let tree: LooseObject = {};
	let newTree: LooseObject = [];
	const readDirectory = (folder: string, folderName: string = "") => {
		const files = readdirSync(folder);
		for (const file of files) {
			const stat = statSync(`${folder}/${file}`);
			if (!stat.isFile()) {
				tree[file] = [];
				newTree.push({
					name: file,
					children: readdirSync(path.join(folder, file)),
				});
				readDirectory(path.join(folder, file), file);
			} else {
				tree[folderName].push(file);
			}
		}
	};

	readDirectory(`www/${serial}/`);
	res.status(200);
	res.send(JSON.stringify(newTree, null, 4));
});

//DEFINE API ROUTES ABOVE !!!

app.use((req: Request, res: Response, next: Function) => {
	if (req.path.includes(".")) {
		next();
		return;
	}

	// React needs each route to point to index.html
	res.sendFile(path.join(dirname, "../Frontend/dist/index.html"));
});

//Static files
app.use("/data", express.static(path.join(dirname, "www")));
app.use(express.static(path.join(dirname, "../Frontend/dist")));

// start the Express server
server.listen(port, "0.0.0.0", () => {
	console.log(`server started at http://0.0.0.0:${port}`);
});
