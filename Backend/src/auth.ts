import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import { validateUser, generateUser } from "./database";

const generateAccessToken = (body: any) => {
	const key = process.env?.TOKEN_SECRET?.toString() || "";
	return jwt.sign(body, key);
};

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;
	if (!(username && password)) {
		res.status(400); // Bad Request
		res.send("Invalid / Missing username and/or password");
		return false;
	}

	if (!(await validateUser(username, password))) {
		console.log("Hash doesnt match");
		res.status(401); // Unauthorized
		return false;
	}

	res.cookie("bearer", generateAccessToken({ username }), { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
	res.status(202); // Accepted
	res.send("AUTH OK");
	return true;
};

export const register = async (req: Request, res: Response) => {
	const { username, password, serialnumber } = req.body;
	const created = await generateUser(username, password, serialnumber);

	if (!created) {
		res.status(409); //Conflict
		res.send("Already registered");
		return false;
	}

	return true;
};