export const Color = ({
	color,
	team,
	side,
	updateColorState,
	updateScoreState,
	onClick,
}: {
	color: string;
	team: number;
	side: string;
	updateColorState: Function;
	updateScoreState: Function;
	onClick?: (event?: any) => any;
}) => {
	const SetValue = (team: number, side: string) => {
		switch (team.toString() + side) {
			case "1B":
				return "ColorsHomeTop";
			case "1O":
				return "ColorsHomeBottom";
			case "2B":
				return "ColorsOutTop";
			case "2O":
				return "ColorsOutBottom";
		}
	};

	return (
		<div
			className="c-colorpicker__colors-color"
			style={{ backgroundColor: color }}
			onClick={
				onClick
					? onClick
					: () => {
							updateColorState(SetValue(team, side), color);
							updateScoreState(SetValue(team, side), color);
					  }
			}></div>
	);
};

export default Color;
