import dotenv from "dotenv";
import { MongoClient } from "mongodb";

import { hash, validateHash } from "./crypto";

dotenv.config();

const connstr = process.env.MONGO_CONNECTION as string;
const database = new MongoClient(connstr);
const dbName = "IndustryProject"; //TODO : Move to config

export const connect = async () => {
	await database.connect();
	console.log("Connected to database");
};

export const generateUser = async (username: string, password: string, serialnumber: string) => {
	if (!connstr || connstr == null) {
		return true;
	}

	await connect();
	const db = database.db(dbName);
	const collection = db.collection("accounts");

	const checkExistence = await collection.find({ serialnumber }).toArray();
	if (checkExistence.length) {
		return false;
	}

	await collection.insertOne({
		serialnumber,
		username,
		password: await hash(password),
		admin: true,
		users: [],
	});

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

export default { connect, generateUser, validateUser };
