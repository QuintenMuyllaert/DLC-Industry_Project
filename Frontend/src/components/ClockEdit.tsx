import IconButton from "./IconButton";
import { scoreboardInterface } from "../utils/ScoreboardInterface";
import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";
import { useState } from "react";

export const ClockEdit = ({ active }: { active: boolean }) => {
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	const setTimer = () => {
		console.log("clicker on clock");

		if (state.clockData.paused) {
			scoreboardInterface.resumeTimer();
			console.log("started timer");
		} else if (state.clockData.paused == false) {
			scoreboardInterface.pauseTimer();
			console.log("paused timer");
		}
	};

	const setNewTime = () => {
		console.log("setting new timer...");
		let totalSeconds: number = seconds + minutes * 60;
		scoreboardInterface.setTimer(totalSeconds);
	};

	return (
		<>
			<div className={active ? "c-clockedit__overlay" : "c-clockedit__overlay c-clockedit__hidden"}></div>
			<div className={active ? "c-clockedit" : "c-clockedit c-clockedit__hidden"}>
				<div className="c-clockedit__container">
					<h1 className="title">Stel een nieuwe tijd in</h1>
					<div className="clockinput">
						<input
							onChange={(event: React.FormEvent<HTMLInputElement>) => {
								setMinutes(parseInt(event.currentTarget.value));
							}}
							placeholder="00"
							className="side"
							type="number"
							id="inputclockleft"
						/>
						<p className="middle">:</p>
						<input
							onChange={(event: React.FormEvent<HTMLInputElement>) => {
								setSeconds(parseInt(event.currentTarget.value));
							}}
							placeholder="00"
							className="side"
							type="number"
							id="inputclockright"
						/>
					</div>
					<h1 className="title">start of stop de timer</h1>
					<IconButton
						color="black"
						onClick={setTimer}
						icon={
							state.clockData.paused ? (
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
									<polygon points="5 3 19 12 5 21 5 3"></polygon>
								</svg>
							) : (
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
									<rect x="6" y="4" width="4" height="16"></rect>
									<rect x="14" y="4" width="4" height="16"></rect>
								</svg>
							)
						}
					/>
					<IconButton color="black" label="BEVESTIG" onClick={setNewTime} />
				</div>
			</div>
		</>
	);
};

export default ClockEdit;
