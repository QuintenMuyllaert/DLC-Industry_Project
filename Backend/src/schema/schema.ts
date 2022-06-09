export interface admin {
	username: string;
	password: string;
	parent: false;
	serial: string;
}

export interface user {
	username: string;
	password: string;
	parent: string;
	firstLogin: boolean;
}

export interface scoreboard {
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

export interface template {
	serial: string;
	name: string;
	parts: number;
	duration: number;
}

export const defaultTemplate: template = {
	serial: "N/A",
	name: "N/A",
	parts: 0,
	duration: 0,
};

export const defaultScoreboard: scoreboard = {
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
