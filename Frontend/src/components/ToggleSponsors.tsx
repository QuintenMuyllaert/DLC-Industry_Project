import { useEffect, useState } from "react";

import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";

export const ToggleSponsors = ({ handleClickToggle }: { handleClickToggle: (event?: any) => any }) => {
	const fetchSponsors = async () => {
		console.log(`/sponsors?serial=X3462L7L`, { mode: "no-cors", method: "GET" });

		const res = await fetch(`/sponsors?serial=X3462L7L`, { mode: "no-cors", method: "GET" });
		const json = await res.json();
		updateState("sponsors", json);
	};

	useEffect(() => {
		fetchSponsors();
	}, []);

	const handleClickSelect = () => {
		handleClickToggle("right");
	};

	let sponsors = [];

	for (const sponsorBundel of state.sponsors) {
		sponsors.push(<option value={sponsorBundel.name}>{sponsorBundel.name}</option>);
	}

	return (
		<div className="c-scorebordToggle">
			<div className={`c-scorebordToggle__active c-scorebordToggle__active-${state.scorbordSponsorsToggle}`}></div>
			<div className="c-scorebordToggle__btn-container">
				<button
					className="c-scorebordToggle__btn c-scorebordToggle__scorebord"
					onClick={() => {
						handleClickToggle("left");
					}}>
					Scorebord
				</button>
				<button
					className="c-scorebordToggle__btn c-scorebordToggle__sponsors"
					onClick={() => {
						handleClickToggle("right");
					}}>
					Sponsors
				</button>
			</div>
			<div className="c-scorebordToggle__select">
				<select name="sponsorBundel" id="sponsorBundel" value="0" onChange={handleClickSelect}>
					<option value="0"></option>
					{sponsors}
				</select>
			</div>
		</div>
	);
};

export default ToggleSponsors;
