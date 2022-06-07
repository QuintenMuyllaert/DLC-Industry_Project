"use-strict";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import http from "http";
import cookie from "cookie";
import { Server } from "socket.io";

import { writeFileSync, existsSync } from "fs";
import { randomBytes } from "crypto";

import { login, register } from "./auth";
import { jwtverifyAsync } from "./crypto";
import { generateScoreboard, getScoreboardData } from "./database";
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
	});

	const { valid, body } = await jwtverifyAsync(cookies.bearer);
	socket.auth = valid;
	socket.body = body;
	console.log(socket.id, "JWT :", valid, body);
	if (socket.auth && body.serial) {
		const ns = await gengetNamespace(body.serial, true);
		ns.addUser(socket);
	}
});

// HTTP(S) webserver
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DEFINE API ROUTES BELOW !!!
app.get("/status", async (req, res) => {
	const token = req.cookies?.bearer;
	const { valid, body } = await jwtverifyAsync(token);

	console.log(valid, body);

	if (valid) {
		res.status(200);
		res.send("true");
		return;
	}

	res.status(401);
	res.send("false");
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
app.use(express.static(path.join(dirname, "../Frontend/dist")));

// start the Express server
server.listen(port, "0.0.0.0", () => {
	console.log(`server started at http://0.0.0.0:${port}`);
});
