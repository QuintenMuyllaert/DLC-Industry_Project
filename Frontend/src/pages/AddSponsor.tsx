import { useState, useRef } from "react";
import { LooseObject } from "../utils/Interfaces";
import BottomTab from "../components/BottomTab";
import UserSetting from "../components/UserSetting";
import IconButton from "../components/IconButton";
import Logo from "../components/Logo";
import Input from "../components/Input";
import { scoreboardInterface } from "../utils/ScoreboardInterface";
import { getQuery } from "../utils/Utils";
import { useNavigate } from "react-router-dom";
import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";

export const AddSponsor = () => {
	const navigate = useNavigate();
	// const template: LooseObject = {};

	// const [newTemplate, setnewTemplate] = useState(template);
	const [sponsorNaam, setSponsorNaam] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [validatieNaam, setValidatieNaam] = useState(false);

	// const updateNewTemplate = (key: any, value: string) => {
	// 	newTemplate[key] = value;
	// 	setnewTemplate(newTemplate);
	// };

	//TODO : ⬇ implement this in UI
	// scoreboardInterface.uploadProperties("sponsormap", "sponsornaam");

	const inputEl = useRef(null);
	scoreboardInterface.upload(inputEl);

	const enableInput = (str: string) => {
		if (str != "") {
			setDisabled(false);
			setValidatieNaam(false);
		}
	};

	const { bundel } = getQuery();

	const handleClickNewSponsor = () => {
		if (sponsorNaam) {
			scoreboardInterface.uploadProperties(bundel, sponsorNaam);
			// navigate(`/sponsors?bundel=${bundel}`);
		} else {
			setValidatieNaam(true);
		}
	};

	return (
		<>
			<div className="p-addSponsor element">
				<header className="p-addSponsor__header">
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
				</header>
				<div className="c-addSponsor__tekst">
					<h1>Nieuwe sponsor</h1>
					<p>
						Aanbevolen aspect ratio: <strong>16:9</strong>
					</p>
					<p>
						Aanbevolen bestandstype: <strong>PNG</strong>
					</p>
				</div>

				<div className="p-addSponsor__form">
					<div className="c-input">
						<label htmlFor="naamSponsor">Naam sponsor</label>
						<input
							id="naamSponsor"
							type="text"
							onChange={(event: React.FormEvent<HTMLInputElement>) => {
								setSponsorNaam(event.currentTarget.value);
								enableInput(event.currentTarget.value);
							}}
						/>
					</div>
					<p className={validatieNaam ? "p-addSponsor__validatie" : "p-addSponsor__validatie p-addSponsor__hidden"}>Vul de naam van de sponsor in</p>
					<input ref={inputEl} style={{ display: "none" }} type="file" id="siofu_input" disabled={disabled} />
					<label htmlFor="siofu_input" className="p-addSponsor__logo">
						<div className="p-addSponsor__logo-container">
							<p>Selecteer een logo</p>
							<div className="p-addSponsor__logo-svg">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="40"
									height="40"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
									<polyline points="17 8 12 3 7 8"></polyline>
									<line x1="12" y1="3" x2="12" y2="15"></line>
								</svg>
							</div>
						</div>
					</label>
				</div>

				<div className="p-addSponsor__btn">
					{/* <IconButton label="OPSLAAN" color="white" onClick={handleClickNewSponsor} /> */}

					<button className="c-iconbutton white center" onClick={handleClickNewSponsor} disabled={!state.fileIsUploaded}>
						Opslaan
					</button>
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default AddSponsor;
