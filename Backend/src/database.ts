import dotenv from "dotenv";
import { MongoClient } from "mongodb";

import { hash, validateHash } from "./crypto";
import { admin, user, scoreboard, template } from "./schema/schema";

dotenv.config();

const connstr = process.env.MONGO_CONNECTION as string;
const database = new MongoClient(connstr);
const dbName = "IndustryProject"; //TODO : Move to config

export const connect = async () => {
	await database.connect();
	console.log("Connected to database");
};

export const checkExistence = async (collectionName: "accounts" | "scoreboards", obj: any) => {
	await connect();
	//console.log("Finding in", collectionName, obj);
	const db = database.db(dbName);
	const collection = db.collection(collectionName);
	const checkExistence = await collection.find(obj).toArray();
	//console.log("Reply", checkExistence, checkExistence.length);
	return checkExistence || [];
};

export const generateUserAdmin = async (username: string, password: string, serial: string) => {
	if (!connstr || connstr == null) {
		return true;
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
	await collection.insertOne(adminObj);
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
	await collection.insertOne(userObj);

	return true;
};

export const getScoreboardData = async (serial: string) => {
	return await checkExistence("scoreboards", { serial });
};

export const generateScoreboard = async (serial: string) => {
	const scoreboardObj: scoreboard = {
		serial,
		isPlaying: false,
		hb: "black",
		ho: "black",
		ub: "black",
		uo: "black",
		t1: 0,
		t2: 0,
		message: "DLC Sportsystems - Made with 💙 by QMA",
		timer: "00:00",
		nameHome: "THUIS",
		nameOut: "UIT",
		timerStart: new Date(),
		timerOffset: new Date(),
		pauseStart: new Date(),
		pauseStop: new Date(),
		lastKnownIp: "0.0.0.0",
		hasAdmin: false,
	};

	await connect();
	const db = database.db(dbName);
	const collection = db.collection("scoreboards");
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

export default { connect, generateUserAdmin, generateUserModerator, validateUser };
