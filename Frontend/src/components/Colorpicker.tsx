import { useEffect, useState } from "react";
import { LooseObject } from "../utils/Interfaces";
import { findApi, trigger } from "../utils/Networking";
import Color from "./Color";
import Flag from "./Flag";
import IconButton from "./IconButton";

export const Colorpicker = ({ team, updateScoreState, onClick }: { team: number; updateScoreState: Function; onClick?: (event?: any) => any }) => {
	const defaultState: LooseObject = {
		API: "http://127.0.0.1:1234",
		ColorsHomeTop: "red",
		colorsHomeBottom: "blue",
		colorsOutTop: "yellow",
		colorsOutBottom: "green",
		first: true,
	};

	const [state, setState] = useState(defaultState);

	const updateState = (key: string, value: any) => {
		state[key] = value;
		setState({ ...state }); // React voodoo magic
	};

	const colorLUT: LooseObject = {
		green: "Groen",
		lightblue: "LichtBlauw",
		darkblue: "DonkerBlauw",
		blue: "Blauw",
		white: "Wit",
		black: "Zwart",
		yellow: "Geel",
		red: "Rood",
		orange: "Oranje",
		darkred: "bordeaux",
	};

	let colors = Object.keys(colorLUT);

	return (
		<>
			<div className="c-colorpicker__overlay c-colorpicker__hidden"></div>
			<div className="c-colorpicker c-colorpicker__hidden">
				<div className="c-colorpicker__container scrollbar">
					<div className="c-colorpicker__close">
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
					</div>
					<Flag top={state.colorsOutTop} bottom={state.colorsOutBottom} />
					<p>Kies een kleur voor de bovenkant</p>
					<div className="c-colorpicker__colors">
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"B"} team={team} color={colors[0]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"B"} team={team} color={colors[1]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"B"} team={team} color={colors[2]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"B"} team={team} color={colors[3]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"B"} team={team} color={colors[4]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"B"} team={team} color={colors[5]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"B"} team={team} color={colors[6]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"B"} team={team} color={colors[7]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"B"} team={team} color={colors[8]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"B"} team={team} color={colors[9]} />
						<div className="c-colorpicker__colors-colorAdd">
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
								<line x1="12" y1="5" x2="12" y2="19"></line>
								<line x1="5" y1="12" x2="19" y2="12"></line>
							</svg>
						</div>
					</div>
					<p>Kies een kleur voor de onderkant</p>
					<div className="c-colorpicker__colors">
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"O"} team={team} color={colors[0]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"O"} team={team} color={colors[1]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"O"} team={team} color={colors[2]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"O"} team={team} color={colors[3]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"O"} team={team} color={colors[4]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"O"} team={team} color={colors[5]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"O"} team={team} color={colors[6]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"O"} team={team} color={colors[7]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"O"} team={team} color={colors[8]} />
						<Color updateColorState={updateState} updateScoreState={updateScoreState} side={"O"} team={team} color={colors[9]} />
						<div className="c-colorpicker__colors-colorAdd">
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
								<line x1="12" y1="5" x2="12" y2="19"></line>
								<line x1="5" y1="12" x2="19" y2="12"></line>
							</svg>
						</div>
					</div>
					<IconButton color="black" label="Opslaan"></IconButton>
				</div>
			</div>
		</>
	);
};

export default Colorpicker;
