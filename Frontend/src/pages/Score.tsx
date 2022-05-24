import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Flag } from "../components/Flag";
import { Clock } from "../components/Clock";
import { Digit } from "../components/Digit";
import { IconButton } from "../components/IconButton";
import { BottomTab } from "../components/BottomTab";
import { LooseObject } from "../utils/Interfaces";
import { findApi } from "../utils/Networking";

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
	darkred: "Bordeaux",
};

export const Score = () => {
	const defaultState: LooseObject = {
		API: "http://0.0.0.0:1234",
		scoreHome: 0,
		scoreOut: 0,
		nameHome: "TORHOUT",
		nameOut: "KORTRIJK",
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

	useEffect(() => {
		if (state.first) {
			updateState("first", false);

			(async () => {
				updateState("API", await findApi());
				//Screen to scoreboard
				fetch(`${state.API}/update?Keuze=P0`, { mode: "no-cors" });

				//Reset timer
				fetch(`${state.API}/update?Timer=Ti1`, { mode: "no-cors" });

				//Reset both teams
				fetch(`${state.API}/update?G1=T0`, { mode: "no-cors" });
				fetch(`${state.API}/update?G2=U0`, { mode: "no-cors" });

				//Set team colors
				fetch(`${state.API}/update?K1B=${colorLUT[state.colorsHome[0]]}`, { mode: "no-cors" });
				fetch(`${state.API}/update?K1O=${colorLUT[state.colorsHome[1]]}`, { mode: "no-cors" });
				fetch(`${state.API}/update?K2B=${colorLUT[state.colorsOut[0]]}`, { mode: "no-cors" });
				fetch(`${state.API}/update?K2O=${colorLUT[state.colorsOut[1]]}`, { mode: "no-cors" });
			})();
		}

		const interval = setInterval(() => {
			updateState("clock", state.clock + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, [state]);

	const score = (team: string, amt: number) => {
		const name = team == "scoreHome" ? "G1" : "G2";
		const dir = amt >= 1 ? "NEXT" : "PREVIOUS";

		if (state[team] == 0 && amt <= 0) {
			return;
		}

		fetch(`${state.API}/update?${name}=${dir}`, { mode: "no-cors" });
		updateState(team, state[team] + amt);
	};

	return (
		<>
			<div className="p-score">
				<Clock time={state.clock}></Clock>
				<div className="scorevalue-container">
					<Flag top={state.colorsHome[0]} bottom={state.colorsHome[1]} />
					<div className="empty"></div>
					<Flag top={state.colorsOut[0]} bottom={state.colorsOut[1]} />

					<h2 className="teamname">{state.nameHome}</h2>
					<div className="empty"></div>
					<h2 className="teamname">{state.nameOut}</h2>

					<Digit
						value={state.scoreHome}
						style="^v"
						onClickUp={() => {
							score("scoreHome", 1);
						}}
						onClickDown={() => {
							score("scoreHome", -1);
						}}
					/>
					<p className="seperator">-</p>
					<Digit
						value={state.scoreOut}
						style="^v"
						onClickUp={() => {
							score("scoreOut", 1);
						}}
						onClickDown={() => {
							score("scoreOut", -1);
						}}
					/>
				</div>

				<IconButton
					icon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
						</svg>
					}
					color="white"
					label="WIJZIG BERICHT"></IconButton>

				<div className="u-grid-horizontal-2">
					<IconButton color="white" label="Scorebord"></IconButton>
					<IconButton color="black" label="Sponsors"></IconButton>
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default Score;
