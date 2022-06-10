export const Clock = ({ time, onClick }: { time: number | `${number}:${number}`; onClick?: (event?: any) => any }) => {
	let display = "";

	if (typeof time === "string") {
		display = time;
	} else {
		let sec: number | string = time % 60;
		let min: number | string = (time - sec) / 60;

		if (min < 10) {
			min = `0${min}`;
		}

		if (sec < 10) {
			sec = `0${sec}`;
		}

		display = `${min}:${sec}`;
	}

	return (
		<div className="c-clock">
			<h1 className="time">{display}</h1>
		</div>
	);
};

export default Clock;
