import { useState, useRef } from "react";
import { LooseObject } from "../utils/Interfaces";
import BottomTab from "../components/BottomTab";
import UserSetting from "../components/UserSetting";
import IconButton from "../components/IconButton";
import Logo from "../components/Logo";
import Input from "../components/Input";
import { scoreboardInterface } from "../utils/ScoreboardInterface";

export const AddSponsor = () => {
	const template: LooseObject = {};

	const [newTemplate, setnewTemplate] = useState(template);

	const updateNewTemplate = (key: any, value: string) => {
		newTemplate[key] = value;
		setnewTemplate(newTemplate);
	};

	//TODO : ⬇ implement this in UI
	scoreboardInterface.uploadProperties("sponsormap", "sponsornaam");

	const inputEl = useRef(null);
	scoreboardInterface.upload(inputEl);

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

				<h1>Nieuwe sponsor</h1>

				<div className="p-addSponsor__form">
					<Input id="naamSponsor" label="Naam sponsor" type="text" />

					<input ref={inputEl} style={{ display: "none" }} type="file" id="siofu_input" />
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
					<IconButton label="OPSLAAN" color="white" />
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default AddSponsor;
