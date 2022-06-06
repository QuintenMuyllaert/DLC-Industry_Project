import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hash = async (str: string) => {
	return await bcrypt.hash(str, await bcrypt.genSalt(10));
};

export const validateHash = async (plaintext: string, hash: string) => {
	return await bcrypt.compare(plaintext, hash);
};

export const jwtverifyAsync = async (token: string) => {
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

export default {
	hash,
	validateHash,
	jwtverifyAsync,
};
