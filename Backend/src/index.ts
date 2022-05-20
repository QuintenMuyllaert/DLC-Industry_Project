"use-strict";
import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";
import { writeFileSync, existsSync } from "fs";
import { randomBytes } from "crypto";

const dirname = process.cwd();

// TODO : Refactor this.
if (!existsSync("./.env")) {
	const SECRET = randomBytes(64).toString("hex");
	writeFileSync("./.env", `TOKEN_SECRET=${SECRET}`);
}

// get config vars
dotenv.config();

// TODO : module the security related methods
const generateAccessToken = (body: any) => {
	const key = process.env?.TOKEN_SECRET?.toString() || "";
	return jwt.sign(body, key);
};

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

app.post("/auth", (req: Request, res: Response) => {
	const { username, password } = req.body;
	if (!(username && password)) {
		res.status(400); // Bad Request
		res.send("Invalid / Missing username and/or password");
		return;
	}

	//TODO : Actually check password
	res.cookie("bearer", generateAccessToken({ username }), { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
	res.status(202); // Accepted
	res.send("AUTH OK");
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
app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
