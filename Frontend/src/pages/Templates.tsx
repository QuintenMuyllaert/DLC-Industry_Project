import { useEffect, useState } from "react";
import BottomTab from "../components/BottomTab";
import IconButton from "../components/IconButton";

import Input from "../components/Input";
import Logo from "../components/Logo";
import Template from "../components/Template";
import { LooseObject } from "../utils/Interfaces";
import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";
import ModalConfirm from "../components/ModalConfirm";

export const Templates = () => {
	const fetchTemplates = async () => {
		const res = await fetch(`/template?serial=X3462L7L`, { mode: "no-cors", method: "GET" });
		const json = await res.json();
		updateState("templates", json);
	};

	const handleClickNewTemplate = async () => {
		const res = await fetch(`/template?serial=X3462L7L`, {
			mode: "cors",
			method: "POST",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"content-type": "application/json",
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: JSON.stringify(newTemplate),
		});
	};

	useEffect(() => {
		fetchTemplates();
	}, []);

	let templates = [];

	const handleClickDeletePopup = () => {
		updateState("deleteTemplatePopup", !state.deleteTemplatePopup);
	};

	const handleDeleteTemplate = async () => {
		const toDelete: LooseObject = {
			name: state.templateToDelete,
		};

		const res = await fetch(`/template?serial=X3462L7L`, {
			mode: "cors",
			method: "DELETE",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"content-type": "application/json",
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: JSON.stringify(toDelete),
		});

		updateState("deleteTemplatePopup", !state.deleteTemplatePopup);
	};

	for (const template of state.templates) {
		templates.push(
			<Template sportNaam={template.name} aantalHelften={template.parts} duurHelft={template.duration} handleDeletePopup={handleClickDeletePopup} />,
		);
	}

	const template: LooseObject = {
		name: "",
		parts: 0,
		duration: 0,
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
						updateNewTemplate("name", event.currentTarget.value);
						console.log(template);
					}}
				/>

				<div className="p-templates__formgroup">
					<Input
						id="aantalHelften"
						label="Aantal helften"
						type="number"
						onChange={(event: React.FormEvent<HTMLInputElement>) => {
							updateNewTemplate("parts", event.currentTarget.value);
							console.log(template);
						}}
					/>

					<Input
						id="duurHelft"
						label="Duur helft"
						type="number"
						onChange={(event: React.FormEvent<HTMLInputElement>) => {
							updateNewTemplate("duration", event.currentTarget.value);
							console.log(template);
						}}
					/>
				</div>

				<IconButton label="Toevoegen" color="white" onClick={handleClickNewTemplate} />

				<h1>Bestaande templates</h1>
				<div className="p-templates__list scrollbar">{templates}</div>
			</div>
			<BottomTab />
			<ModalConfirm
				active={state.deleteTemplatePopup}
				tekst="Ben je zeker dat je deze template wilt verwijderen?"
				handleClickDeletePopup={handleClickDeletePopup}
				handleDelete={handleDeleteTemplate}
			/>
		</>
	);
};

export default Templates;
