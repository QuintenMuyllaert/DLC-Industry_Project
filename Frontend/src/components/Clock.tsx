export const Clock = ({ time }: { time: number }) => {
	let sec: number | string = time % 60;
	let min: number | string = (time - sec) / 60;

	if (min < 10) {
		min = `0${min}`;
	}

	if (sec < 10) {
		sec = `0${sec}`;
	}

	return (
		<div className="c-clock">
			<h1 className="time">
				{min}:{sec}
			</h1>
		</div>
	);
};

export default Clock;
