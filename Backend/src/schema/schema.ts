export interface User {
	username: string;
	password: string;
	isAdmin: boolean;
	serial: string;
	firstLogin: boolean;
}

export interface Scoreboard {
	isPlaying: boolean;
	hb: string;
	ho: string;
	ub: string;
	uo: string;
	t1: number;
	t2: number;
	message: string;
	timer: string;

	nameHome: string;
	nameOut: string;
	timerStart: Date;
	timerOffset: Date;
	pauseStart: Date;
	pauseStop: Date;
	serial: string;
	lastKnownIp: string;
	hasAdmin: boolean;
	colors: string[];
}

/*export interface template {
	name: number;
	K1B: string;
	K2B: string;
	K1O: string;
	K2O: string;
	sponsers: Array<string>;
	nameHome: number;
	nameOut: number;
	periods: number;
	periodLength: number;
}*/

export interface Template {
	serial: string;
	name: string;
	parts: number;
	duration: number;
}

export const defaultTemplate: Template = {
	serial: "N/A",
	name: "N/A",
	parts: 0,
	duration: 0,
};

export const defaultScoreboard: Scoreboard = {
	serial: "N/A",
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
	colors: ["green", "lightblue", "darkblue", "purple", "white", "black", "yellow", "red", "orange", "darkred"],
	hasAdmin: false,
};

export interface LooseObject {
	[key: string]: any;
}
