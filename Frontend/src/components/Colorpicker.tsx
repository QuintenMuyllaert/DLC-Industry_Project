import { useEffect, useState } from "react";
import { LooseObject } from "../utils/Interfaces";
import Color from "./Color";
import Flag from "./Flag";
import IconButton from "./IconButton";

import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";

export const Colorpicker = ({
	team,
	updateScoreState,
	active,
	handleClickPopup,
}: {
	team: 1 | 2;
	updateScoreState: Function;
	active: boolean;
	handleClickPopup?: (event?: any) => any;
}) => {
	const colorsB = [];
	const colorsO = [];
	for (const color of state.colors) {
		colorsB.push(<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"B"} team={team} color={color} Ecolor={color} />);
		colorsO.push(<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"O"} team={team} color={color} Ecolor={color} />);
	}

	return (
		<>
			<div className={active ? "c-colorpicker__overlay" : "c-colorpicker__overlay c-colorpicker__hidden"}></div>
			<div className={active ? "c-colorpicker" : "c-colorpicker c-colorpicker__hidden"}>
				<div className="c-colorpicker__container scrollbar">
					<button className="c-colorpicker__close" onClick={handleClickPopup ? handleClickPopup : () => {}}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
					<Flag top={team == 1 ? state.hb : state.ub} bottom={team == 1 ? state.ho : state.uo} />
					<p>Kies een kleur voor de bovenkant</p>
					<div className="c-colorpicker__colors">
						<>{colorsB}</>
						<div className="c-colorpicker__colors-colorAdd">
							<input className="c-colorpicker__colors-colorAdd-input" type="color" id="newColorTop" />
							<label className="c-colorpicker__colors-colorAdd-label" htmlFor="newColorTop">
								<svg
									className="icon"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<line x1="12" y1="5" x2="12" y2="19"></line>
									<line x1="5" y1="12" x2="19" y2="12"></line>
								</svg>
							</label>
						</div>
					</div>
					<p>Kies een kleur voor de onderkant</p>
					<div className="c-colorpicker__colors">
						<>{colorsO}</>
						<div className="c-colorpicker__colors-colorAdd">
							<input className="c-colorpicker__colors-colorAdd-input" type="color" id="newColorBottom" />
							<label className="c-colorpicker__colors-colorAdd-label" htmlFor="newColorBottom">
								<svg
									className="icon"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<line x1="12" y1="5" x2="12" y2="19"></line>
									<line x1="5" y1="12" x2="19" y2="12"></line>
								</svg>
							</label>
						</div>
					</div>
					<IconButton color="black" label="Opslaan" onClick={handleClickPopup ? handleClickPopup : () => {}}></IconButton>
				</div>
			</div>
		</>
	);
};

export default Colorpicker;
