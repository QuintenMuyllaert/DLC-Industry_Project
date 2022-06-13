import IconButton from "./IconButton";
import { scoreboardInterface } from "../utils/ScoreboardInterface";
import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";
import { trigger } from "../utils/Networking";
import Clock from "./Clock";

export const ClockEdit = ({ active }: { active: boolean }) => {
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

	return (
		<>
			<div className={active ? "c-clockedit__overlay" : "c-clockedit__overlay c-clockedit__hidden"}></div>
			<div className={active ? "c-clockedit" : "c-clockedit c-clockedit__hidden"}>
				<div className="c-clockedit__container">
					<Clock time={state.getClock()}></Clock>

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
					<IconButton color="black" label="Send message" />
				</div>
			</div>
		</>
	);
};

export default ClockEdit;
