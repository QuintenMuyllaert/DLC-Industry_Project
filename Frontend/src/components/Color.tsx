import { useState } from "react";
import { LooseObject } from "../utils/Interfaces";
import { scoreboardInterface } from "../utils/ScoreboardInterface";

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
	const defaultState: LooseObject = {
		API: "http://127.0.0.1:1234",
	};

	const [state] = useState(defaultState);

	const SetValue = (team: number, side: string) => {
		switch (team.toString() + side) {
			case "1B":
				return "colorsHomeTop";
			case "1O":
				return "colorsHomeBottom";
			case "2B":
				return "colorsOutTop";
			case "2O":
				return "colorsOutBottom";
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
							updateColorState(SetValue(team, side), Ecolor);
							updateScoreState(SetValue(team, side), Ecolor);

							scoreboardInterface.changeColor(`${team}${side}`, Ecolor);
					  }
			}></div>
	);
};

export default Color;
