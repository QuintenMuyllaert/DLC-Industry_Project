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
