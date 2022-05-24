import bcrypt from "bcrypt";

export const hash = async (str: string) => {
	return await bcrypt.hash(str, await bcrypt.genSalt(10));
};

export const validateHash = async (plaintext: string, hash: string) => {
	return await bcrypt.compare(plaintext, hash);
};

export default {
	hash,
	validateHash,
};
