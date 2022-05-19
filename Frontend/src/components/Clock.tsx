export const Clock = ({ time }: { time: string }) => {
	return (
		<div className="c-clock">
			<h1 className="time">{time}</h1>
		</div>
	);
};

export default Clock;
