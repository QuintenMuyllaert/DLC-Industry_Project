import { useEffect, useState } from "react";
import { LooseObject } from "../utils/Interfaces";
import BottomTab from "../components/BottomTab";
import UserSetting from "../components/UserSetting";
import IconButton from "../components/IconButton";
import Logo from "../components/Logo";
import { getQuery } from "../utils/Utils";
import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export const TemplateSettings = () => {
	const navigate = useNavigate();

	const ingeladenTemplate: LooseObject = {
		name: "",
		parts: 0,
		duration: 0,
	};

	const [newTemplate, setnewTemplate] = useState(ingeladenTemplate);

	const updateNewTemplate = (key: any, value: string) => {
		newTemplate[key] = value;
		setnewTemplate(newTemplate);
	};

	const fetchTemplates = async () => {
		const res = await fetch(`/template?serial=${state.serial}`, { mode: "no-cors", method: "GET" });
		const json = await res.json();
		updateState("templates", json);
	};

	useEffect(() => {
		fetchTemplates();

		for (const templateI of state.templates) {
			if (templateI.name === template) {
				updateNewTemplate("name", templateI.name);
				updateNewTemplate("parts", templateI.parts);
				updateNewTemplate("duration", templateI.duration);
			}
		}
	}, []);

	const { template } = getQuery();

	const handleClickUpdateTemplate = async () => {
		const res = await fetch(`/template?serial=${state.serial}`, {
			mode: "cors",
			method: "PUT",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"content-type": "application/json",
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: JSON.stringify(newTemplate),
		});

		navigate(`/templates`);
	};

	const goToTemplates = () => {
		navigate(`/templates`);
	};

	return (
		<>
			<div className="p-templatesettings element">
				<Header
					icon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="c-header__back">
							<line x1="19" y1="12" x2="5" y2="12"></line>
							<polyline points="12 19 5 12 12 5"></polyline>
						</svg>
					}
					page={goToTemplates}
				/>

				<h1 className="pagetitle">{newTemplate.name}</h1>

				<div className="content">
					<div className="item">
						<p className="title">template naam:</p>
						<UserSetting
							id="name"
							password={false}
							content={newTemplate.name}
							onChange={(event: React.FormEvent<HTMLInputElement>) => {
								updateNewTemplate("name", event.currentTarget.value);
							}}
						/>
						{/* onChange */}
					</div>
					<div className="item">
						<p className="title">helften:</p>
						<UserSetting
							id="parts"
							password={false}
							content={newTemplate.parts}
							onChange={(event: React.FormEvent<HTMLInputElement>) => {
								updateNewTemplate("parts", event.currentTarget.value);
							}}
						/>
					</div>
					<div className="item">
						<p className="title">duur:</p>
						<UserSetting
							id="duration"
							password={false}
							content={newTemplate.duration}
							onChange={(event: React.FormEvent<HTMLInputElement>) => {
								updateNewTemplate("duration", event.currentTarget.value);
							}}
						/>
					</div>
				</div>
				<div className="p-templatesettings__btn">
					<IconButton label="OPSLAAN" color="white" onClick={handleClickUpdateTemplate} />
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default TemplateSettings;
