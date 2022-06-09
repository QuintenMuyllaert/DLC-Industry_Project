import dotenv from "dotenv";
import { MongoClient } from "mongodb";

import { hash, validateHash } from "./crypto";
import { admin, user, scoreboard, template, defaultScoreboard } from "./schema/schema";

dotenv.config();

const connstr = process.env.MONGO_CONNECTION as string;
const database = new MongoClient(connstr);
const dbName = "IndustryProject"; //TODO : Move to config

export const connect = async () => {
	await database.connect();
	console.log("Connected to database");
};

export const checkExistence = async (collectionName: "accounts" | "scoreboards" | "colors" | "templates", obj: any) => {
	console.log("DB asking ", collectionName, obj);
	try {
		await connect();
		//console.log("Finding in", collectionName, obj);
		const db = database.db(dbName);
		const collection = db.collection(collectionName);
		const checkExistence = await collection.find(obj).toArray();
		//console.log("Reply", checkExistence, checkExistence.length);
		return checkExistence || [];
	} catch (err) {
		console.log("error asking db", collectionName, obj);
		return [];
	}
};

export const generateUserAdmin = async (username: string, password: string, serial: string) => {
	if (!connstr || connstr == null) {
		return true;
	}

	const existScoreboard = await checkExistence("scoreboards", { serial, hasAdmin: false });

	if (!existScoreboard.length) {
		return;
	}

	const existSerienummer = await checkExistence("accounts", { serial });
	const existUsername = await checkExistence("accounts", { username });

	if (existSerienummer.length || existUsername.length) {
		return false;
	}

	const adminObj: admin = {
		serial,
		username,
		password: await hash(password),
		parent: false,
	};

	await connect();
	const db = database.db(dbName);
	const collection = db.collection("accounts");
	console.log("Making admin obj");
	await collection.insertOne(adminObj);

	existScoreboard[0].hasAdmin = true;
	const scoreboardObj: scoreboard = { ...defaultScoreboard, ...existScoreboard[0] } as scoreboard;

	updateScoreboard(serial, scoreboardObj);
	return true;
};

export const generateUserModerator = async (username: string, password: string, parent: string) => {
	if (!connstr || connstr == null) {
		return true;
	}

	const existSerienummer = await checkExistence("accounts", { username: parent });
	const existUsername = await checkExistence("accounts", { username });

	if (existSerienummer.length || existUsername.length) {
		return false;
	}

	const userObj: user = {
		username,
		password: await hash(password),
		parent,
		firstLogin: true,
	};

	await connect();
	const db = database.db(dbName);
	const collection = db.collection("accounts");
	console.log("Making user obj");
	await collection.insertOne(userObj);

	return true;
};

export const getScoreboardData = async (serial: string) => {
	return await checkExistence("scoreboards", { serial });
};

export const generateScoreboard = async (serial: string) => {
	const scoreboardObj: scoreboard = { ...defaultScoreboard, serial };

	await connect();
	const db = database.db(dbName);
	const collection = db.collection("scoreboards");
	console.log("Making scoreboard obj");
	await collection.insertOne(scoreboardObj);
	return getScoreboardData(serial);
};

export const validateUser = async (username: string, password: string) => {
	if (!connstr || connstr == null) {
		return true;
	}

	await connect();
	const db = database.db(dbName);
	const collection = db.collection("accounts");

	const qReply = await collection.find({ username }).toArray();
	if (qReply.length <= 0) {
		return false;
	}

	if (!(await validateHash(password, qReply[0].password))) {
		return false;
	}

	return true;
};

export const updateScoreboard = async (serial: string, data: scoreboard) => {
	const board = await checkExistence("scoreboards", { serial });
	if (!board.length) {
		return false;
	}

	await connect();
	const db = database.db(dbName);
	const collection = db.collection("scoreboards");
	console.log("Making update board");
	await collection.updateOne({ serial }, { $set: data });
	console.log("Done");
};

export const generateTemplate = async (data: template) => {
	await connect();
	const db = database.db(dbName);
	const collection = db.collection("templates");
	console.log("Making template obj");

	await collection.insertOne(data);
	console.log("Done");
};

export const getTemplates = async (serial: string) => {
	return checkExistence("templates", { serial }) || [];
};

export const deleteTemplate = async (serial: string, name: string) => {
	await connect();
	const db = database.db(dbName);
	const collection = db.collection("templates");
	console.log("Deleting template");
	await collection.deleteOne({ serial, name });
	console.log("Done");
};

export default { connect, generateUserAdmin, generateUserModerator, validateUser, updateScoreboard, getScoreboardData, generateScoreboard };
