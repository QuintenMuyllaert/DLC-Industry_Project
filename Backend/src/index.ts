"use-strict";
import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";

import { writeFileSync, existsSync } from "fs";
import { randomBytes } from "crypto";

import { login, register } from "./auth";

const dirname = process.cwd();

// TODO : Refactor this.
if (!existsSync("./.env")) {
	const SECRET = randomBytes(64).toString("hex");
	writeFileSync("./.env", `TOKEN_SECRET=${SECRET}`);
}

// get config vars
dotenv.config();

const app = express();
const port = 80; // TODO : Move to config

const protectedRoutes = ["/score"]; // TODO : Move to config
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
app.listen(port, "0.0.0.0", () => {
	console.log(`server started at http://0.0.0.0:${port}`);
});
