import { Flag } from "../components/Flag";
import { Clock } from "../components/Clock";
import { Digit } from "../components/Digit";
import { IconButton } from "../components/IconButton";
import { BottomTab } from "../components/BottomTab";
import Colorpicker from "../components/Colorpicker";
import TextEdit from "../components/TextEdit";

import { scoreboardInterface } from "../utils/ScoreboardInterface";

import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";

export const Score = () => {
	if (state.first) {
		updateState("first", false);

		//Screen to scoreboard
		scoreboardInterface.setScreen("P0");

		scoreboardInterface.resetScore();
		scoreboardInterface.resetTimer();

		scoreboardInterface.changeColor("1B", state.colorsHomeTop);
		scoreboardInterface.changeColor("1O", state.colorsHomeBottom);
		scoreboardInterface.changeColor("2B", state.colorsOutTop);
		scoreboardInterface.changeColor("2O", state.colorsOutBottom);
	}

	const score = (team: string, amt: number) => {
		const name = team == "scoreHome" ? "G1" : "G2";

		if (state[team] == 0 && amt <= 0) {
			return;
		}

		scoreboardInterface.addScore(name, amt);
		updateState(team, state[team] + amt);
	};

	const handleClickMessage = () => {
		console.log("hallo");
		updateState("messagePopup", !state.messagePopup);
	};

	const handleClickSendMessage = (message: string) => {
		console.log("hallo");
		updateState("messagePopup", !state.messagePopup);
		scoreboardInterface.sendMessage(message);
		console.log(message);
	};

	const handleClickTeam1Color = () => {
		updateState("teamColorTeam1Popup", !state.teamColorTeam1Popup);
	};

	const handleClickTeam2Color = () => {
		updateState("teamColorTeam2Popup", !state.teamColorTeam2Popup);
	};

	return (
		<>
			<div className="p-score">
				<Clock time={state.clock}></Clock>
				<div className="scorevalue-container">
					<Flag top={state.colorsHomeTop} bottom={state.colorsHomeBottom} handleClickPopup={handleClickTeam1Color} />
					<div className="empty"></div>
					<Flag top={state.colorsOutTop} bottom={state.colorsOutBottom} handleClickPopup={handleClickTeam2Color} />

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
					label="WIJZIG BERICHT"
					onClick={handleClickMessage}></IconButton>

				<div className="u-grid-horizontal-2">
					<IconButton color="white" label="Scorebord"></IconButton>
					<IconButton color="black" label="Sponsors"></IconButton>
				</div>
			</div>

			<BottomTab />

			<Colorpicker team={1} updateScoreState={updateState} active={state.teamColorTeam1Popup} handleClickPopup={handleClickTeam1Color} />
			<Colorpicker team={2} updateScoreState={updateState} active={state.teamColorTeam2Popup} handleClickPopup={handleClickTeam2Color} />
			<TextEdit active={state.messagePopup} handleClickMessage={handleClickMessage} handleClickSendMessage={handleClickSendMessage} />
		</>
	);
};

export default Score;
