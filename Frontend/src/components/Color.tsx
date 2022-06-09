import { scoreboardInterface } from "../utils/ScoreboardInterface";
import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";

export const Color = ({
	color,
	Ecolor,
	team,
	side,
	updateColorState,
	updateScoreState,
	onClick,
}: {
	color: string;
	Ecolor: string;
	team: 1 | 2;
	side: "B" | "O";
	updateColorState: Function;
	updateScoreState: Function;
	onClick?: (event?: any) => any;
}) => {
	const SetValue = (team: number, side: string) => {
		switch (team.toString() + side) {
			case "1B":
				return "hb";
			case "1O":
				return "ho";
			case "2B":
				return "ub";
			case "2O":
				return "uo";
		}
	};

	return (
		<div
			className="c-colorpicker__colors-color"
			style={{ backgroundColor: Ecolor }}
			onClick={
				//somethings not right here.
				onClick
					? onClick
					: () => {
							console.log(state);

							if (state.isRemove) {
								let index = state.colors.indexOf(color);
								let newColorArray: string[] = state.colors;
								newColorArray.splice(index, 1);
								console.log("updating state...");
								updateState("colors", newColorArray);
								console.log("deleting color...");
								scoreboardInterface.updateColorArray(newColorArray);
								console.log(state.colors);
							}

							updateColorState(SetValue(team, side), Ecolor);
							updateScoreState(SetValue(team, side), Ecolor);

							scoreboardInterface.changeColor(`${team}${side}`, Ecolor);
					  }
			}></div>
	);
};

export default Color;
