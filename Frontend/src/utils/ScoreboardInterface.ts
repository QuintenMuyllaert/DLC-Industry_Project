import { trigger } from "../utils/Networking";
import { colorLUT } from "../utils/Utils";

const usingHTTP = true;

export class InterfaceHTTP {
	uri: string;
	t1score: number = 0;
	t2score: number = 0;
	message: string = "";
	constructor(uri: string) {
		this.uri = uri;
	}
	changeColor(team: `${1 | 2}${"B" | "O"}`, color: string) {
		trigger(`${this.uri}/update?K1B=${colorLUT[color]}`);
	}
	resetScore() {
		//Reset both teams
		trigger(`${this.uri}/update?G1=T0`);
		trigger(`${this.uri}/update?G2=U0`);
	}
	addScore(team: "G1" | "G2", score: number) {
		//TODO: this is not working
		/*const dir = score >= 1 ? "NEXT" : "PREVIOUS";

		if (state[team] == 0 && score <= 0) {
			return;
		}

		trigger(`${state.API}/update?${team}=${dir}`);
		updateState(team, state[team] + amt);*/
	}
	resetTimer() {
		//Reset timer
		trigger(`${this.uri}/update?Timer=Ti1`);
	}
	setTimer(time: number) {
		//TODO : Implement
		//ISSUE : http api from DLC doesnt support this
	}
	sendMessage(message: string) {
		trigger(`${this.uri}/update?message=${encodeURI(message)}&submit=Send+message`);
	}
	getMessage() {
		return this.message;
	}
	setScreen(screen: `P${number}`) {
		trigger(`${this.uri}/update?Keuze=${screen}`);
	}
}

export class InterfaceSocket {
	uri: string;
	constructor(uri: string) {
		this.uri = uri;
	}
	// TODO : Implement
}

export const scoreboardInterface = usingHTTP ? new InterfaceHTTP("http://127.0.0.1:1234") : new InterfaceSocket("wss://127.0.0.1");
