import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";
import BottomTab from "../components/BottomTab";
import Logo from "../components/Logo";
import Sponsor from "../components/Sponsor";
import { getQuery } from "../utils/Utils";
import { useNavigate } from "react-router-dom";
import ModalConfirm from "../components/ModalConfirm";

export const Sponsors = () => {
	const navigate = useNavigate();

	const fetchSponsors = async () => {
		const res = await fetch(`/sponsors?serial=${state.serial}`, { mode: "no-cors", method: "GET" });
		const json = await res.json();
		updateState("sponsors", json);
	};

	fetchSponsors();

	const handleClickDeletePopup = () => {
		updateState("deleteSponsorPopup", !state.deleteSponsorPopup);
	};

	const handleDeleteSponsor = async () => {
		const res = await fetch(`/sponsors?serial=${state.serial}&bundle=${state.sponsorToDelete.bundel}&file=${state.sponsorToDelete.sponsor}`, {
			mode: "cors",
			method: "DELETE",
			cache: "no-cache",
			credentials: "same-origin",
			redirect: "follow",
			referrerPolicy: "no-referrer",
		});
		handleClickDeletePopup();
		console.log(state.deleteSponsorPopup);
	};

	const { bundel } = getQuery();

	let sponsors = [];

	for (const sponsorBundel of state.sponsors) {
		if (sponsorBundel.name === bundel) {
			for (const sponsor of sponsorBundel.children) {
				sponsors.push(<Sponsor img={sponsor} map={sponsorBundel.name} handleClickDeletePopup={handleClickDeletePopup} />);
			}
		}
	}

	const handleClickNewSponsor = async () => {
		navigate(`/addsponsor?bundel=${bundel}`);
	};

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

				<button className="p-sponsors__add" onClick={handleClickNewSponsor}>
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
				</button>
			</div>
			<BottomTab />
			<ModalConfirm
				active={state.deleteSponsorPopup}
				tekst="Ben je zeker dat je deze sponsor wilt verwijderen?"
				handleClickDeletePopup={handleClickDeletePopup}
				handleDelete={handleDeleteSponsor}
			/>
		</>
	);
};

export default Sponsors;
