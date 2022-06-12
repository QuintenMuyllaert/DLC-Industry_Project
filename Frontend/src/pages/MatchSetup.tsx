import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { IconButton } from "../components/IconButton";
import { LooseObject } from "../utils/Interfaces";
import Flag from "../components/Flag";
import BottomTab from "../components/BottomTab";
import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";

export const MatchSetup = () => {
	const navigate = useNavigate();

	const [checked, setChecked] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [selectedTemplate, setselectedTemplate] = useState("");

	const fetchTemplates = async () => {
		const res = await fetch(`/template?serial=X3462L7L`, { mode: "no-cors", method: "GET" });
		const json = await res.json();
		updateState("templates", json);
	};

	const handleClickNewTemplate = async () => {
		if (checked) {
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

			navigate(`/score`);
		} else {
			navigate(`/score`);
		}
	};

	useEffect(() => {
		fetchTemplates();
	}, []);

	let templates = [];

	for (const template of state.templates) {
		templates.push(<option value={template.name}>{template.name}</option>);
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
		console.log(newTemplate);
	};

	const handleOnchangeSelect = (selectedValue: string) => {
		setselectedTemplate(selectedValue);
		console.log(selectedTemplate);
		for (const template of state.templates) {
			if (template.name == selectedTemplate) {
				updateNewTemplate("name", template.name);
				updateNewTemplate("parts", template.parts);
				updateNewTemplate("duration", template.duration);
				console.log("hoi");
			}
		}

		if (selectedValue != "") {
			setChecked(true);
			setDisabled(true);
		} else {
			setChecked(false);
			setDisabled(false);
		}
	};

	const handleChecked = () => {
		if (checked) {
			setChecked(false);
		} else {
			setChecked(true);
		}
	};

	return (
		<>
			<div className="p-matchsetup maxwidth">
				<h1>Team instellingen</h1>
				<div className="teamsettings-container u-grid-vertical-gap">
					<div className="flagcontainer">
						<p>Thuis</p>
						<Flag top="#FF0000" bottom="#00FF66" />
					</div>
					<div className="flagcontainer">
						<p>uit</p>
						<Flag top="#1900FF" bottom="#F7FF00" />
					</div>
				</div>
				<h1>Match instellingen</h1>
				<div className="matchsettings-container">
					<div className="c-option">
						<label htmlFor="selectedTemplate">Template selecteren</label>
						<select
							id="selectedTemplate"
							onChange={(e) => {
								if (e.target.value != "0") {
									handleOnchangeSelect(e.target.value);
								} else {
									handleOnchangeSelect("");
								}
							}}>
							<option value="0" selected>
								Selecteer een template
							</option>
							{templates}
						</select>
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
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</div>

					<Input
						id="sport"
						label="Naam sport"
						type="text"
						inputValue={selectedTemplate != "" ? newTemplate.name : null}
						onChange={(event: React.FormEvent<HTMLInputElement>) => {
							updateNewTemplate("name", event.currentTarget.value);
							console.log(template);
						}}
					/>

					<div className="match-helft">
						<div className="helft">
							<Input
								label="Helften"
								type="number"
								id="helften-aantal"
								inputValue={selectedTemplate != "" ? newTemplate.parts : null}
								onChange={(event: React.FormEvent<HTMLInputElement>) => {
									updateNewTemplate("parts", event.currentTarget.value);
									console.log(template);
								}}
							/>
						</div>
						<div className="duur">
							<Input
								label="Duur helft"
								type="number"
								id="helften-tijd"
								inputValue={selectedTemplate != "" ? newTemplate.duration : null}
								onChange={(event: React.FormEvent<HTMLInputElement>) => {
									updateNewTemplate("duration", event.currentTarget.value);
									console.log(template);
								}}
							/>
						</div>
					</div>
					<div className="c-checkbox">
						<input type="checkbox" id="saveTemplate" name="saveTemplate" value="Yes" onClick={handleChecked} checked={checked} disabled={disabled} />
						<label htmlFor="saveTemplate">Deze instellingen opslaan als template</label>
					</div>
				</div>
				<IconButton color="white" label="Start match" onClick={handleClickNewTemplate}></IconButton>
			</div>
			<BottomTab />
		</>
	);
};

export default MatchSetup;
