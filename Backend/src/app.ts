import path from "path";

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
//@ts-ignore
import siofu from "socketio-file-upload";
import { readdirSync, statSync, existsSync, unlinkSync } from "fs";

import database from "./database";
import { extractToken, hasAccess, jwtVerifyAsync, jwtSignAsync, hash, validateHash } from "./crypto";
import { User, LooseObject, Template } from "./schema/schema";

export const dirname = process.cwd();
export const app = express();

// HTTP(S) webserver
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(siofu.router);

//DEFINE API ROUTES BELOW !!!

app.get("/status", async (req: Request, res: Response) => {
	const token = extractToken(req);
	if (!token) {
		res.status(401).send("Unauthorized");
		return;
	}
	const { valid, body } = await jwtVerifyAsync(token);
	if (!valid) {
		res.status(401).send("Unauthorized");
		return;
	}
	res.send(body);
});

app.post("/auth", async (req: Request, res: Response) => {
	const { username, password } = req.body;
	if (!username || !password) {
		res.status(400).send("Missing username or password");
		return;
	}
	const userExists = await database.exists("accounts", { username });
	if (!userExists) {
		res.status(401).send("Invalid username or password");
		return;
	}
	const [userdata] = await database.read("accounts", { username });
	const valid = await validateHash(password, userdata?.password);
	if (!valid) {
		res.status(401).send("Hash does not match");
		return;
	}

	const token = await jwtSignAsync({ username: userdata?.username, serial: userdata?.serial, isAdmin: userdata?.isAdmin });

	res.cookie("bearer", token, {
		maxAge: 30 * 24 * 60 * 60 * 1000,
		httpOnly: true,
	});
	res.cookie("auth", true, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: false });
	res.status(202).send("AUTH OK");
});

app.post("/register", async (req: Request, res: Response) => {
	const { username, password, serial } = req.body;
	if (!username || !password || !serial) {
		res.status(400).send("Missing username or password or serial");
		return;
	}

	const userExists = await database.exists("accounts", { username });
	if (userExists) {
		res.status(401).send("User exists");
		return;
	}

	const scoreboardExists = await database.exists("scoreboards", { serial });
	if (!scoreboardExists) {
		res.status(401).send("Scoreboard does not exist");
		return;
	}

	const [scoreboarddata] = await database.read("scoreboards", { serial });

	if (!scoreboarddata.hasAdmin) {
		const newUser: User = {
			username,
			password: await hash(password),
			serial,
			isAdmin: true,
			firstLogin: false,
		};
		await database.update("scoreboards", { serial }, { ...scoreboarddata, hasAdmin: true });
		await database.create("accounts", newUser);
		res.redirect("/auth");
	} else {
		const newUser: User = {
			username,
			password: await hash(password),
			serial,
			isAdmin: false,
			firstLogin: true,
		};
		await database.create("accounts", newUser);
		res.status(202).send("REGISTER OK");
	}
});

app.get("/logout", (req: Request, res: Response) => {
	res.clearCookie("bearer");
	res.clearCookie("auth");
	res.redirect("/");
});

app.get("/sponsors", async (req: Request, res: Response) => {
	const token = extractToken(req);
	if (!token) {
		res.status(401).send("No token");
		return;
	}
	const { valid, body } = await jwtVerifyAsync(token);
	if (!valid) {
		res.status(401).send("Invalid token");
		return;
	}

	const { serial } = body;
	const serialQ = req?.query?.serial;

	if (!serial) {
		res.status(401).send("No serial");
		return;
	}

	if (serial !== serialQ) {
		res.status(401).send("Serial mismatch");
		return;
	}

	const tree: LooseObject = [];
	const folder = `www/${serial}/`;
	const files = readdirSync(folder);
	for (const file of files) {
		const stat = statSync(`${folder}/${file}`);
		if (!stat.isFile()) {
			tree.push({
				name: file,
				children: readdirSync(path.join(folder, file)),
			});
		}
	}

	res.status(200);
	res.send(JSON.stringify(tree, null, 4));
});

app.delete("/sponsors", async (req: Request, res: Response) => {
	const token = extractToken(req);
	if (!token) {
		res.status(401).send("No token");
		return;
	}
	const { valid, body } = await jwtVerifyAsync(token);
	if (!valid) {
		res.status(401).send("Invalid token");
		return;
	}
	const { serial } = body;
	if (!serial) {
		res.status(401).send("No serial");
		return;
	}

	const queryParams = req.query;
	const { bundle, file } = queryParams;
	if (!bundle || !file) {
		res.status(400);
		res.send("Invalid / Missing bundle and/or file");
		return;
	}

	const exists = existsSync(`www/${serial}/${bundle}/${file}`);
	if (!exists) {
		res.status(404);
		res.send("File not found");
		return;
	}

	unlinkSync(`www/${serial}/${bundle}/${file}`);
	res.status(200);
});

app.post("/template", async (req: Request, res: Response) => {
	const token = extractToken(req);
	if (!token) {
		res.status(401).send("No token");
		return;
	}
	const { valid, body } = await jwtVerifyAsync(token);
	if (!valid) {
		res.status(401).send("Invalid token");
		return;
	}
	const { serial } = body;
	if (!serial) {
		res.status(401).send("No serial");
		return;
	}

	const { name, parts, duration } = req.body;
	if (!(name && parts && duration)) {
		console.log("Missing params on template");
		res.status(400); // Bad Request
		res.send("Invalid / Missing username and/or password");
		return;
	}

	const newTemplate: Template = {
		name,
		parts,
		duration,
		serial,
	};

	await database.create("templates", newTemplate);
	res.status(202).send("TEMPLATE OK");
});

app.get("/template", async (req: Request, res: Response) => {
	const token = extractToken(req);
	if (!token) {
		res.status(401).send("No token");
		return;
	}
	const { valid, body } = await jwtVerifyAsync(token);
	if (!valid) {
		res.status(401).send("Invalid token");
		return;
	}
	const { serial } = body;
	if (!serial) {
		res.status(401).send("No serial");
		return;
	}

	const templates = await database.read("templates", { serial });
	res.status(200);
	res.send(JSON.stringify(templates, null, 4));
});

app.put("/template", async (req: Request, res: Response) => {
	const token = extractToken(req);
	if (!token) {
		res.status(401).send("No token");
		return;
	}
	const { valid, body } = await jwtVerifyAsync(token);
	if (!valid) {
		res.status(401).send("Invalid token");
		return;
	}
	const { serial } = body;
	if (!serial) {
		res.status(401).send("No serial");
		return;
	}

	const { name, parts, duration } = req.body;
	if (!(name && parts && duration)) {
		console.log("Missing params on template");
		res.status(400); // Bad Request
		res.send("Invalid / Missing username and/or password");
		return;
	}

	const newTemplate: Template = {
		name,
		parts,
		duration,
		serial,
	};

	await database.update("templates", { serial }, newTemplate);
	res.status(202).send("TEMPLATE OK");
});

app.delete("/template", async (req: Request, res: Response) => {
	const token = extractToken(req);
	if (!token) {
		res.status(401).send("No token");
		return;
	}
	const { valid, body } = await jwtVerifyAsync(token);
	if (!valid) {
		res.status(401).send("Invalid token");
		return;
	}
	const { serial } = body;
	if (!serial) {
		res.status(401).send("No serial");
		return;
	}

	const { name } = req.body;
	if (!name) {
		console.log("Missing params on template");
		res.status(400); // Bad Request
		res.send("Invalid / Missing username and/or password");
		return;
	}

	await database.delete("templates", { serial, name });
	res.status(202).send("TEMPLATE OK");
});

app.get("/users", async (req: Request, res: Response) => {
	const token = extractToken(req);
	if (!token) {
		res.status(401).send("No token");
		return;
	}
	const { valid, body } = await jwtVerifyAsync(token);
	if (!valid) {
		res.status(401).send("Invalid token");
		return;
	}
	const { serial, isAdmin } = body;
	if (!serial || !isAdmin) {
		res.status(401).send("No serial");
		return;
	}
	const users = [];
	const usersDB = await database.read("accounts", { serial });
	for (const user of usersDB) {
		users.push({
			username: user?.username,
			isAdmin: user?.isAdmin,
		});
	}

	res.status(200);
	res.send(JSON.stringify(users, null, 4));
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
