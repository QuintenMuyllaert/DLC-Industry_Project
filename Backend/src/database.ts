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

export const checkExistence = async (collectionName: string, obj: any) => {
	await connect();
	const db = database.db(dbName);
	const collection = db.collection(collectionName);
	const checkExistence = await collection.find(obj).toArray();
	if (checkExistence.length) {
		return false;
	}
	return collection || true;
};

export const generateUserAdmin = async (username: string, password: string, serialnumber: string) => {
	if (!connstr || connstr == null) {
		return true;
	}

	const existSerienummer = await checkExistence("accounts", { serialnumber });
	const existUsername = await checkExistence("accounts", { username });

	if (existSerienummer || existUsername) {
		return false;
	}

	const adminObj: admin = {
		serialnumber,
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

	if (existSerienummer || existUsername) {
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
