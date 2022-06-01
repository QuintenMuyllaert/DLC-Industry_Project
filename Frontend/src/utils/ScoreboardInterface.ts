import { ping, findApi } from "../utils/Networking";
import { colorLUT } from "../utils/Utils";

const usingHTTP = true;
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
	constructor(uri: string) {
		this.uri = uri;
	}
	changeColor(team: `${1 | 2}${"B" | "O"}`, color: string) {}
	resetScore() {}
	addScore(team: "G1" | "G2", score: number) {}
	resetTimer() {}
	setTimer(time: number) {}
	sendMessage(message: string) {}
	getMessage() {}
	setScreen(screen: `P${number}`) {}
	detect = async () => {
		return "";
	};
}

export const scoreboardInterface: InterfaceScoreboard = usingHTTP ? new InterfaceHTTP("http://127.0.0.1:1234") : new InterfaceSocket("wss://127.0.0.1");
