import { clockify } from "./util";
import { Timer } from "./timer";
export const SocketNamespace = class SocketNamespace {
	serial: string;
	users: Array<any> = [];
	displays: Array<any> = [];
	data: any = {};
	time: number = 0;
	clock = new Timer();
	constructor(serial: string, data: any) {
		console.log("Created namespace", serial);
		this.serial = serial;
		this.data = data;
		this.clock.set(0);

		setInterval(() => {
			if (this.clock.changes) {
				this.clock.changes = false;
				this.emitAll("clock", this.clock.data);
			}
		}, 50);
	}
	addDisplay(socket: any) {
		console.log("Added display to namespace", this.serial);
		socket.emit("data", "#hb", "attr", "style", `fill:${this.data.hb}`);
		socket.emit("data", "#ub", "attr", "style", `fill:${this.data.ub}`);
		socket.emit("data", "#ho", "attr", "style", `fill:${this.data.ho}`);
		socket.emit("data", "#uo", "attr", "style", `fill:${this.data.uo}`);
		socket.emit("data", "#message", "text", this.data.message);
		//socket.emit("data", "#timer", "text", this.data.timer);
		socket.emit("data", "#t1", "text", this.data.t1);
		socket.emit("data", "#t2", "text", this.data.t2);

		socket.emit("clock", this.clock.data);

		this.displays.push(socket);
		socket.on("disconnect", () => {
			this.displays.splice(this.displays.indexOf(socket), 1);
		});
	}
	tick() {
		this.time++;
		this.data.timer = clockify(this.time);
		this.emitUsers("state", { timer: this.data.timer });
		this.emitDisplays("data", "#timer", "text", this.data.timer);
	}
	addUser(socket: any) {
		console.log("Added user to namespace", this.serial);
		socket.emit("state", this.data);
		socket.emit("clock", this.clock.data);
		this.users.push(socket);
		socket.on("disconnect", () => {
			this.users.splice(this.users.indexOf(socket), 1);
		});

		socket.on("clock", (data: any) => {
			if (data.action === "set") {
				this.clock.set(data.value || 0);
			}
			if (data.action === "pause") {
				this.clock.pause();
			}
			if (data.action === "resume") {
				this.clock.resume();
			}
			this.emitAll("clock", this.clock.data);
		});
	}
	emitAll(event: string, ...args: any[]) {
		//console.log(`Sending to ${this.displays.length} displays & ${this.users.length} users in ${this.serial}`);
		this.displays.forEach((display) => {
			display.emit(event, ...args);
		});
		this.users.forEach((user) => {
			user.emit(event, ...args);
		});
	}
	emitUsers(event: string, ...args: any[]) {
		//console.log(`Sending to ${this.users.length} users in ${this.serial}`);
		this.users.forEach((user) => {
			user.emit(event, ...args);
		});
	}
	emitDisplays(event: string, ...args: any[]) {
		this.displays.forEach((display) => {
			display.emit(event, ...args);
		});
	}
};
