export const Timer = class Timer {
	clockStart = Date.now();
	pauseStart = Date.now();
	pauseStop = 0;
	clockOffset = 0;
	paused = true;
	get data() {
		return {
			clockStart: this.clockStart,
			pauseStart: this.pauseStart,
			pauseStop: this.pauseStop,
			clockOffset: this.clockOffset,
			paused: this.paused,
			clock: this.clockify(),
		};
	}
	constructor() {
		// TODO : Remove this
		setInterval(() => {
			console.log("Timer: " + this.clockify());
		}, 1000);
	}
	clockify() {
		const now = Date.now();
		const ms = this.paused ? this.pauseStart - this.clockStart - this.clockOffset : now - this.clockStart - this.clockOffset;
		const seconds = Math.floor(ms / 1000);
		const minutes = Math.floor(seconds / 60);

		const to2digits = (num: number) => {
			return num < 10 ? `0${num}` : num;
		};

		return `${to2digits(minutes)}:${to2digits(seconds % 60)}`;
	}
	set(time = 0) {
		this.clockStart = Date.now();
		this.pauseStart = Date.now();
		this.pauseStop = 0;
		this.clockOffset = time * 1000;
	}
	pause() {
		this.paused = true;
		this.pauseStart = Date.now();
	}
	resume() {
		this.paused = false;
		this.pauseStop = Date.now();
		this.clockOffset += this.pauseStop - this.pauseStart;
	}
};
