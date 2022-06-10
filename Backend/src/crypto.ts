import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export type Connection = Request | any;

export const hash = async (str: string) => {
	return await bcrypt.hash(str, await bcrypt.genSalt(10));
};

export const validateHash = async (plaintext: string, hash: string) => {
	return await bcrypt.compare(plaintext, hash);
};

export const jwtVerifyAsync = async (token: string) => {
	let ret = { valid: false, body: {} as any };

	ret = await new Promise((resolve, reject) => {
		jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, body: any) => {
			if (!err) {
				//Token is valid!
				resolve({ valid: true, body });
			}

			//Token is invalid!
			resolve({ valid: false, body });
		});
	});

	ret.body = ret.body === undefined ? ({} as any) : ret.body;

	return ret;
};

export const jwtSignAsync = async (body: any) => {
	return await jwt.sign(body, process.env.TOKEN_SECRET as string);
};

export const hasAccess = async (body: any, requirements: any) => {
	const requiredKeys = Object.keys(requirements);
	for (const requiredKey of requiredKeys) {
		if (!body.hasOwnProperty(requiredKey)) {
			console.log("Missing required key: " + requiredKey);
			return false;
		}
		if (requirements[requiredKey] !== "*" && body[requiredKey] !== requirements[requiredKey]) {
			console.log("Invalid value for key: " + requiredKey);
			return false;
		}
	}
	console.log("Access granted!");
	return true;
};

export const extractToken = (connection: Connection) => {
	const fromHttp = connection?.cookies?.bearer;
	const fromHeader = connection?.headers?.authorization;

	const cookief = connection?.handshake?.headers?.cookie;
	const cookies = cookief ? cookie.parse(connection?.handshake?.headers?.cookie) : {};
	const fromSocket = cookies?.bearer;

	const token = fromHttp || fromHeader || fromSocket;
	console.log("Token: ", fromHttp, fromHeader, fromSocket);
	return token;
};
