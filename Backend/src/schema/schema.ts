export const admin = {
	username: "",
	password: "",
	parent: false,
	serialnumber: "",
};

export const user = {
	username: "",
	password: "",
	parent: "",
	firstLogin: true,
};

export const scoreboard = {
	isPlaying: true,
	K1B: "Rood",
	K2B: "Rood",
	K1O: "Rood",
	K2O: "Rood",
	scoreHome: 0,
	scoreOut: 0,
	matchStart: new Date(),
	serialnumber: "",
	lastKnownIp: "",
};

export const template = {
	name: "",
	K1B: "Rood",
	K2B: "Rood",
	K1O: "Rood",
	K2O: "Rood",
	sponsers: [""],
	nameHome: "",
	nameOut: "",
	periods: 2,
	periodLength: 24,
};

export default {
	admin,
	user,
	scoreboard,
	template,
};
