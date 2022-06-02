"use-strict";
import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";
import http from "http";
import cookie from "cookie";
import { Server } from "socket.io";

import { writeFileSync, existsSync } from "fs";
import { randomBytes } from "crypto";

import { login, register } from "./auth";
import { hslToHex, to2digits } from "./util";

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
const protectedRoutes = ["/score", "/register-user"]; // TODO : Move to config
const antiProtectedRoutes = ["/login"]; // TODO : Move to config

const app = express();

const server = http.createServer(app);
const io = new Server(server);

// WS(S) server
const scoreboards: LooseObject = {};

io.on("connection", (socket: any) => {
	const cookief = socket.handshake.headers.cookie;
	const cookies = cookief ? cookie.parse(socket.handshake.headers.cookie) : {};
	console.log("a user connected", socket.id, cookies);

	socket.auth = false;

	if (cookies.bearer) {
		//Check and verify the JWT token
		const token = cookies?.bearer;
		jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, body: any) => {
			if (!err) {
				//Token is valid!
				socket.auth = true;
				return;
			}
		});
	}
	const dt = 10; //ms
	const interval = setInterval(() => {
		const now = Date.now();
		const color = hslToHex((0.1 * now) % 360, 100, 50);

		const d = new Date(now);
		//TODO : Actually use logic.

		// In the API this is a dynamic JQuerry call.
		// socket.emit("data",element,thing,type,value); === $(element)[thing](type,?value);

		//socket.emit("data", "#hb", "attr", "style", `fill:${color}`);
		//socket.emit("data", "#ub", "attr", "style", `fill:${color}`);
		socket.emit("data", "#timer", "text", to2digits(d.getHours()) + ":" + to2digits(d.getMinutes()));
		//socket.emit("data", "#message", "attr", "x", 1.2 * 336 - ((performance.now() * 0.04) % (336 * 2 * 1.2)));
		//socket.emit("data", "#message", "text", "test 1234");
	}, dt);

	socket.on("data", (data: any) => {
		console.log(socket.id, data);
		if (!data) {
			return;
		}
		socket.serial = data;
		socket.data = {
			t1: 0,
			t2: 0,
			hb: "black",
			ho: "black",
			ub: "black",
			uo: "black",
			timer: 0,
			message: "Quinten was hier",
			screen: "P0",
		};

		socket.emit("data", "#hb", "attr", "style", `fill:${socket.data.hb}`);
		socket.emit("data", "#ub", "attr", "style", `fill:${socket.data.ub}`);
		socket.emit("data", "#ho", "attr", "style", `fill:${socket.data.ho}`);
		socket.emit("data", "#uo", "attr", "style", `fill:${socket.data.uo}`);
		socket.emit("data", "#message", "text", socket.data.message);
		socket.emit("data", "#timer", "text", socket.data.timer);
		socket.emit("data", "#t1", "text", socket.data.t1);
		socket.emit("data", "#t2", "text", socket.data.t2);

		scoreboards[socket.serial] = socket;

		console.log("Scoreboards connected : ", Object.keys(scoreboards).length, Object.keys(scoreboards));
	});

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		clearInterval(interval);
		const keys = Object.keys(scoreboards);
		for (const key of keys) {
			if (scoreboards[key].id === socket.id) {
				//remove the scoreboard
				console.log("user was scoreboard", socket.serial);
				delete scoreboards[key];
				break;
			}
		}
		console.log("Scoreboards connected : ", Object.keys(scoreboards).length, Object.keys(scoreboards));
	});

	socket.on("input", (type: any, value: any) => {
		if (type === undefined || value === undefined) {
			console.log("No type or value");
			return;
		}

		//TODO : link board to auth
		if (!socket.auth) {
			console.log("No auth");
			return;
		}

		//TODO : link scoreboard v
		const scoreboardSocket = Object.values(scoreboards)[0];
		if (!scoreboardSocket) {
			console.log("No scoreboard");
			return;
		}

		console.log(type, value);
		switch (type) {
			case "1B": {
				scoreboardSocket.data.hb = value;
				scoreboardSocket.emit("data", "#hb", "attr", "style", `fill:${value}`);
				break;
			}
			case "2B": {
				scoreboardSocket.data.ub = value;
				scoreboardSocket.emit("data", "#ub", "attr", "style", `fill:${value}`);
				break;
			}
			case "1O": {
				scoreboardSocket.data.ho = value;
				scoreboardSocket.emit("data", "#ho", "attr", "style", `fill:${value}`);
				break;
			}
			case "2O": {
				scoreboardSocket.data.uo = value;
				scoreboardSocket.emit("data", "#uo", "attr", "style", `fill:${value}`);
				break;
			}
			case "screen": {
				//NYI
				break;
			}
			case "message": {
				scoreboardSocket.emit("data", "#message", "text", value);
				break;
			}
			case "timer": {
				scoreboardSocket.emit("data", "#timer", "text", value);
				break;
			}
			case "G1": {
				if (value === "reset") {
					scoreboardSocket.data.t1 = 0;
				} else {
					scoreboardSocket.data.t1 += value;
				}
				scoreboardSocket.emit("data", "#t1", "text", scoreboardSocket.data.t1);
				break;
			}
			case "G2": {
				if (value === "reset") {
					scoreboardSocket.data.t2 = 0;
				} else {
					scoreboardSocket.data.t2 += value;
				}
				scoreboardSocket.emit("data", "#t2", "text", scoreboardSocket.data.t2);
				break;
			}
			default: {
				console.log("No type");
				break;
			}
		}
		io.emit("state", scoreboardSocket.data);
	});
});

// HTTP(S) webserver
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: Function) => {
	//Check protectedRoutes
	if (!protectedRoutes.includes(req.path) && !antiProtectedRoutes.includes(req.path)) {
		next();
		return;
	}

	//Check and verify the JWT token
	const token = req.cookies?.bearer;
	jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, body: any) => {
		if (!err) {
			//Token is valid!
			if (!antiProtectedRoutes.includes(req.path)) {
				next();
			} else {
				res.status(403);
				res.redirect("/score");
			}
			return;
		}

		//Token is invalid!
		res.status(401);
		res.redirect("/");
	});
});

//DEFINE API ROUTES BELOW !!!

app.post("/auth", login);

app.post("/register-admin", async (req: Request, res: Response) => {
	const { username, password, serialnumber } = req.body;
	if (!(username && password && serialnumber)) {
		res.status(400); // Bad Request
		res.send("Invalid / Missing username, password and/or serialnumber");
		return;
	}

	await register(req, res);
	await login(req, res);
});

app.post("/register-user", async (req: Request, res: Response) => {
	const { username, password, serialnumber } = req.body;
	if (!(username && password && serialnumber)) {
		res.status(400); // Bad Request
		res.send("Invalid / Missing username, password and/or serialnumber");
		return;
	}

	await register(req, res);
	await login(req, res);
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
