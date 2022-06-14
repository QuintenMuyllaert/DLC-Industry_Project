import { useEffect, useState } from "react";
import { scoreboardInterface } from "../utils/ScoreboardInterface";
import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";

export const ToggleSponsors = ({ handleClickToggle }: { handleClickToggle: (event?: any) => any }) => {
	const [selectedSponsorbundel, setSelectedSponsorbundel] = useState("");

	const fetchSponsors = async () => {
		console.log(`/sponsors?serial=X3462L7L`, { mode: "no-cors", method: "GET" });

		const res = await fetch(`/sponsors?serial=X3462L7L`, { mode: "no-cors", method: "GET" });
		const json = await res.json();
		updateState("sponsors", json);
	};

	useEffect(() => {
		fetchSponsors();
	}, []);

	let sponsorsSelected: Array<string> = [];

	const handleClickSelect = (selectedValue: string) => {
		handleClickToggle("right");
		setSelectedSponsorbundel(selectedValue);

		for (const sponsorBundel of state.sponsors) {
			if (sponsorBundel.name === selectedValue) {
				for (const sponsor of sponsorBundel.children) {
					let uri = `${document.location.origin}/data/${state.serial}/${sponsorBundel.name}/${sponsor}`;
					sponsorsSelected.push(uri);
				}
			}
		}

		scoreboardInterface.setSponsorReel(sponsorsSelected);
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
				<select
					name="sponsorBundel"
					id="sponsorBundel"
					value="0"
					// onChange={(e) => {
					// 	handleClickSelect(e.target.value);
					// }}
					onChange={(e) => {
						if (e.target.value != "0") {
							handleClickSelect(e.target.value);
						} else {
							handleClickSelect("");
						}
					}}>
					<option value="0"></option>
					<option value="test">test</option>
					{sponsors}
				</select>
			</div>
		</div>
	);
};

export default ToggleSponsors;
