import { useEffect } from "react";

import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";
import BottomTab from "../components/BottomTab";
import Logo from "../components/Logo";
import Sponsor from "../components/Sponsor";
import { getQuery } from "../utils/Utils";

export const Sponsors = () => {
	const fetchSponsors = async () => {
		const res = await fetch(`/sponsors?serial=X3462L7L`, { mode: "no-cors", method: "GET" });
		const json = await res.json();
		updateState("sponsors", json);
	};

	useEffect(() => {
		fetchSponsors();
	}, []);

	const { bundel } = getQuery();

	let sponsors = [];

	for (const sponsorBundel of state.sponsors) {
		if (sponsorBundel.name === bundel) {
			for (const sponsor of sponsorBundel.children) {
				sponsors.push(<Sponsor img={sponsor} />);
			}
		}
	}
	return (
		<>
			<div className="p-sponsors element">
				<div className="p-sponsorTemplates__header">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round">
						<line x1="19" y1="12" x2="5" y2="12"></line>
						<polyline points="12 19 5 12 12 5"></polyline>
					</svg>

					<Logo width="4rem" height="4rem" />
				</div>

				<h1>{bundel}</h1>

				<div className="p-sponsors__list">{sponsors}</div>

				<div className="p-sponsors__add">
					<div className="p-sponsors__add-placeholder">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
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
					<p>Nieuwe sponsor</p>
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default Sponsors;
