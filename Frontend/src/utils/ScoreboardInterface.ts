import { ping, findApi } from "../utils/Networking";
import { io } from "socket.io-client";

import { colorLUT } from "../utils/Utils";

const usingHTTP = false;
const loopback = "http://127.0.0.1:1234";

export class InterfaceScoreboard {
	uri: string;
	constructor(uri: string) {
		this.uri = uri;
	}
	// TODO : Implement
	changeColor(team: `${1 | 2}${"B" | "O"}`, color: string) {}
	resetScore() {}
	addScore(team: "G1" | "G2", score: number) {}
	resetTimer() {}
	setTimer(time: number) {}
	sendMessage(message: string) {}
	getMessage() {}
	setScreen(screen: `P${number}`) {}
	detect = async () => {
		return loopback;
	};
}

export class InterfaceHTTP {
	uri: string;
	t1score: number = 0;
	t2score: number = 0;
	message: string = "";
	constructor(uri: string) {
		this.uri = uri;
	}
	changeColor(team: `${1 | 2}${"B" | "O"}`, color: string) {
		ping(`${this.uri}/update?K${team}=${colorLUT[color]}`);
	}
	resetScore() {
		//Reset both teams
		ping(`${this.uri}/update?G1=T0`);
		ping(`${this.uri}/update?G2=U0`);
	}
	addScore(team: "G1" | "G2", amt: number) {
		const dir = amt >= 1 ? "NEXT" : "PREVIOUS";
		ping(`${this.uri}/update?${team}=${dir}`);
	}
	resetTimer() {
		//Reset timer
		ping(`${this.uri}/update?Timer=Ti1`);
	}
	setTimer(time: number) {
		//TODO : Implement
		//ISSUE : http api from DLC doesnt support this
	}
	sendMessage(message: string) {
		ping(`${this.uri}/update?message=${encodeURI(message)}&submit=Send+message`);
	}
	getMessage() {
		return this.message;
	}
	setScreen(screen: `P${number}`) {
		ping(`${this.uri}/update?Keuze=${screen}`);
	}
	detect = async () => {
		const api = await findApi(true);
		return api ? (api as string) : loopback;
	};
}

export class InterfaceSocket {
	uri: string;
	socket: any;
	message: string = "";
	constructor(uri: string) {
		this.uri = uri;
		this.socket = io();
		this.socket.on("data", (data: any) => {});
	}
	changeColor(team: `${1 | 2}${"B" | "O"}`, color: string) {
		this.socket.emit("input", team, color);
	}
	resetScore() {
		this.socket.emit("input", "G1", "reset");
		this.socket.emit("input", "G2", "reset");
	}
	addScore(team: "G1" | "G2", score: number) {
		this.socket.emit("input", team, score);
	}
	resetTimer() {
		this.socket.emit("input", "time", 0);
	}
	setTimer(time: number) {
		this.socket.emit("input", "time", time);
	}
	sendMessage(message: string) {
		this.message = message;
		this.socket.emit("input", "message", message);
	}
	getMessage() {
		//TODO : Get from server
		return this.message;
	}
	setScreen(screen: `P${number}`) {
		this.socket.emit("input", "screen", screen);
	}
	detect = async () => {
		return this.uri;
	};
}

export const scoreboardInterface: InterfaceScoreboard = usingHTTP ? new InterfaceHTTP("http://127.0.0.1:1234") : new InterfaceSocket("127.0.0.1");
