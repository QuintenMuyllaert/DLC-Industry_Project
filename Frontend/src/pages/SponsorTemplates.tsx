import { useEffect } from "react";

import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";
import BottomTab from "../components/BottomTab";
import IconButton from "../components/IconButton";
import Logo from "../components/Logo";
import SponsorTemplate from "../components/sponsorTemplate";
import { useNavigate } from "react-router-dom";

export const SponsorTemplates = () => {
	const navigate = useNavigate();

	const fetchSponsors = async () => {
		const res = await fetch(`/sponsors?serial=${state.serial}`, { mode: "no-cors", method: "GET" });
		const json = await res.json();
		updateState("sponsors", json);
	};

	useEffect(() => {
		fetchSponsors();
	}, []);

	let sponsors = [];
	for (const sponsorBundel of state.sponsors) {
		sponsors.push(<SponsorTemplate name={sponsorBundel.name} aantal={sponsorBundel.children.length} />);
	}

	const handleClickNewBundel = (bundelNaam: string) => {
		navigate(`/addsponsorbundel`);
	};

	return (
		<>
			<div className="p-sponsorTemplates element">
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
				<h1>Sponsor bundels</h1>
				<div className="p-sponsorTemplates__list">{sponsors}</div>
				<div className="p-sponsorTemplates__btn">
					<IconButton
						color="white"
						label="Bundel toevoegen"
						onClick={handleClickNewBundel}
						icon={
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
						}></IconButton>
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default SponsorTemplates;
