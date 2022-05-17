"use-strict";
import express, { Express, Request, Response } from "express";
import path from "path";

const dirname = process.cwd();

const app = express();
const port = 80; // TODO : Move to config

const protectedRoutes = ["/about"]; // TODO : Move to config

app.use((req: Request, res: Response, next: Function) => {
	const auth = true; // TODO : JWT

	// TODO : Actually usefull logic
	if (auth !== true && protectedRoutes.includes(req.path)) {
		res.status(401);
		res.send("Unauthorized");
		return;
	}

	if (!req.path.includes(".") && req.path !== "/") {
		console.log(req.path);
		res.sendFile(path.join(dirname, "../Frontend/dist/index.html"));
		return;
	}

	next();
});

app.use(express.static(path.join(dirname, "../Frontend/dist")));

// start the Express server
app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
