import { useState } from "react";
import BottomTab from "../components/BottomTab";
import IconButton from "../components/IconButton";

import Input from "../components/Input";
import Logo from "../components/Logo";
import Template from "../components/Template";
import { LooseObject } from "../utils/Interfaces";

export const Templates = () => {
	const template: LooseObject = {
		naam: "",
		aantalHelften: 0,
		duurHelft: 0,
	};

	const [newTemplate, setnewTemplate] = useState(template);

	const updateNewTemplate = (key: any, value: string) => {
		newTemplate[key] = value;
		setnewTemplate(newTemplate);
	};

	return (
		<>
			<div className="p-templates">
				<div className="p-templates__header">
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
				<h1>Nieuwe template toevoegen</h1>
				<Input
					id="naamTemplate"
					label="Naam sport"
					type="text"
					onChange={(event: React.FormEvent<HTMLInputElement>) => {
						updateNewTemplate("naamTemplate", event.currentTarget.value);
					}}
				/>

				<div className="p-templates__formgroup">
					<Input
						id="aantalHelften"
						label="Aantal helften"
						type="number"
						onChange={(event: React.FormEvent<HTMLInputElement>) => {
							updateNewTemplate("aantalHelften", event.currentTarget.value);
						}}
					/>

					<Input
						id="duurHelft"
						label="Duur helft"
						type="number"
						onChange={(event: React.FormEvent<HTMLInputElement>) => {
							updateNewTemplate("duurHelft", event.currentTarget.value);
						}}
					/>
				</div>

				<IconButton label="Toevoegen" color="white" />

				<h1>Bestaande templates</h1>
				<div className="p-templates__list scrollbar">
					<Template sportNaam="Voetbal" aantalHelften={2} duurHelft="45:00" />
					<Template sportNaam="Voetbal jeugd" aantalHelften={4} duurHelft="20:00" />
					<Template sportNaam="Voetbal" aantalHelften={2} duurHelft="45:00" />
					<Template sportNaam="Voetbal" aantalHelften={2} duurHelft="45:00" />
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default Templates;
