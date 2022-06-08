import { ping, findApi } from "../utils/Networking";
import { io } from "socket.io-client";

import { colorLUT, getQuery, xml2json } from "../utils/Utils";
import Appstate from "./Appstate";

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
	upload = (element: any) => {};
	uploadProperties = (folder: string, name: string) => {};
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
	upload = (element: any) => {};
	uploadProperties = (folder: string, name: string) => {};
}

export class InterfaceSocket {
	uri: string;
	socket: any;
	message: string = "";
	uploader: any;
	constructor(uri: string) {
		this.uri = uri;
		this.socket = io(this.uri, { transports: ["websocket"] });

		this.socket.on("connect", async () => {
			/*
			const xml = await(await fetch("http://localhost/status/info", { mode: "no-cors" })).text();
			const playerdata = xml2json(xml);

			this.socket.emit("echo", playerdata);
			
			const serial = playerdata.serial;
			*/
			/*
			this.socket.emit("echo", "in");
			const res = await fetch("https://localhost/user/login", { mode: "no-cors" });
			this.socket.emit("echo", "res");
			const data = await res.text();
			this.socket.emit("echo", data);
			*/

			//@ts-ignore SIFO...
			this.uploader = new SocketIOFileUpload(this.socket);

			const { serial } = getQuery();
			if (serial && serial.length) {
				console.log(serial);
				this.socket.emit("data", serial); // send serial number to server TODO: get serial number from device

				this.socket.on("data", function (element: string, thing: string, type: string, value: string) {
					//$("#wauw").attr('style',dat[0]+": "+dat[1]); // update data
					console.log(element, thing, type, value);

					if (["#hb", "#ub", "#ho", "#uo"].includes(element)) {
						Appstate.updateGlobalState(element.replace("#", ""), value.replace("fill:", ""));
					}
					if (element == "#timer" && thing == "text") {
						Appstate.updateGlobalState("timer", type);
					}
					if (element == "#t1" && thing == "text") {
						Appstate.updateGlobalState("t1", type);
					}
					if (element == "#t2" && thing == "text") {
						Appstate.updateGlobalState("t2", type);
					}
					if (element == "#message" && thing == "text") {
						Appstate.updateGlobalState("message", type);
					}
				});

				this.socket.on("invokeuri", function (uri: string) {
					//NYI
				});
			}
		});

		this.socket.on("state", (data: any) => {
			Appstate.mergeGlobalState(data);
		});
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
	upload = (element: any) => {
		setTimeout(() => {
			this.uploader.listenOnInput(element.current);
		}, 1000);
	};
	uploadProperties = (folder: string, name: string) => {
		this.socket.emit("upload", folder, name);
	};
}

export const scoreboardInterface: InterfaceScoreboard = usingHTTP ? new InterfaceHTTP("http://127.0.0.1:1234") : new InterfaceSocket(document.location.origin);
