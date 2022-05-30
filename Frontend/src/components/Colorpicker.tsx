import { useEffect, useState } from "react";
import { LooseObject } from "../utils/Interfaces";
import { findApi, trigger } from "../utils/Networking";
import Color from "./Color";
import Flag from "./Flag";
import IconButton from "./IconButton";

export const Colorpicker = ({ team, updateScoreState, onClick }: { team: number; updateScoreState: Function; onClick?: (event?: any) => any }) => {
	const defaultState: LooseObject = {
		API: "http://192.168.1.248:1234",
		scoreHome: 0,
		scoreOut: 0,
		nameHome: "THUIS",
		nameOut: "UIT",
		colorsHome: ["red", "blue"],
		colorsOut: ["yellow", "green"],
		clock: 0,
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

	useEffect(() => {
		if (state.first) {
			updateState("first", false);

			(async () => {
				updateState("API", (await findApi()) || state.API);

				//Set team colors
				trigger(`${state.API}/update?K1B=${colorLUT[state.colorsHome[0]]}`);
				trigger(`${state.API}/update?K1O=${colorLUT[state.colorsHome[1]]}`);
				trigger(`${state.API}/update?K2B=${colorLUT[state.colorsOut[0]]}`);
				trigger(`${state.API}/update?K2O=${colorLUT[state.colorsOut[1]]}`);
			})();
		}
	}, [state]);

	return (
		<>
			<div className="c-colorpicker__overlay"></div>
			<div className="c-colorpicker">
				<div className="c-colorpicker__container scrollbar">
					<div className="c-colorpicker__close">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round">
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</div>
					<Flag top={state.colorsOut[0]} bottom={state.colorsOut[1]} />
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
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round">
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
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round">
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
