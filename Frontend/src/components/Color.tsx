import { useState } from "react";
import { LooseObject } from "../utils/Interfaces";
import { trigger } from "../utils/Networking";

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
	team: number;
	side: string;
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
				onClick
					? onClick
					: () => {
							updateColorState(SetValue(team, side), Ecolor);
							updateScoreState(SetValue(team, side), Ecolor);
							trigger(`${state.API}/update?K${team.toString()}${side}=${color}`);
					  }
			}></div>
	);
};

export default Color;
