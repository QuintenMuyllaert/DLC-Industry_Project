export interface admin {
	username: string;
	password: string;
	parent: false;
	serialnumber: string;
}

export interface user {
	username: string;
	password: string;
	parent: string;
	firstLogin: boolean;
}

export interface scoreboard {
	isPlaying: boolean;
	K1B: string;
	K2B: string;
	K1O: string;
	K2O: string;
	scoreHome: number;
	scoreOut: number;
	matchStart: Date;
	serialnumber: string;
	lastKnownIp: string;
}

export interface template {
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
}

export interface color {
	serial: string;
	colorValue: string;
}
