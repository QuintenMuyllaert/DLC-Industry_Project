export const Flag = ({ top, bottom }: { top: string; bottom: string }) => {
	return (
		<div className="c-flag">
			<div className="top" style={{ backgroundColor: top }}></div>
			<div className="bottom" style={{ backgroundColor: bottom }}></div>
		</div>
	);
};

export default Flag;
