"use-strict";
import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";
import http from "http";
import { Server } from "socket.io";

import { writeFileSync, existsSync } from "fs";
import { randomBytes } from "crypto";

import { login, register } from "./auth";
import { hslToHex, to2digits } from "./util";

const dirname = process.cwd();

// TODO : Refactor this.
if (!existsSync("./.env")) {
	const SECRET = randomBytes(64).toString("hex");
	writeFileSync("./.env", `TOKEN_SECRET=${SECRET}`);
}

// get config vars
dotenv.config();

const port = 80; // TODO : Move to config
const protectedRoutes = ["/score"]; // TODO : Move to config

const app = express();

const server = http.createServer(app);
const io = new Server(server);

// WS(S) server
io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const dt = 10; //ms
	const interval = setInterval(() => {
		const now = Date.now();
		const color = hslToHex((0.1 * now) % 360, 100, 50);

		const d = new Date(now);
		//TODO : Actually use logic.

		// In the API this is a dynamic JQuerry call.
		// socket.emit("data",element,thing,type,value); === $(element)[thing](type,?value);

		socket.emit("data", "#hb", "attr", "style", `fill:${color}`);
		socket.emit("data", "#ub", "attr", "style", `fill:${color}`);
		socket.emit("data", "#timer", "text", to2digits(d.getHours()) + ":" + to2digits(d.getMinutes()));
		socket.emit("data", "#message", "attr", "x", 1.2 * 336 - ((performance.now() * 0.04) % (336 * 2 * 1.2)));
		socket.emit("data", "#message", "text", "Quinten was here SOCKETIO WORKS :D");
	}, dt);

	socket.on("data", (data: any) => {
		console.log(socket.id, data);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		clearInterval(interval);
	});
});

// HTTP(S) webserver
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: Function) => {
	//Check protectedRoutes
	if (!protectedRoutes.includes(req.path)) {
		next();
		return;
	}

	//Check and verify the JWT token
	const token = req.cookies?.bearer;
	jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, body: any) => {
		if (!err) {
			//Token is valid!
			next();
			return;
		}

		//Token is invalid!
		res.status(401);
		res.redirect("/");
	});
});

//DEFINE API ROUTES BELOW !!!

app.post("/auth", login);

app.post("/register", async (req: Request, res: Response) => {
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
