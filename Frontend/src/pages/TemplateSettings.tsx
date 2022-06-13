import { useEffect, useState } from "react";
import { LooseObject } from "../utils/Interfaces";
import BottomTab from "../components/BottomTab";
import UserSetting from "../components/UserSetting";
import IconButton from "../components/IconButton";
import Logo from "../components/Logo";
import { getQuery } from "../utils/Utils";
import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";

export const TemplateSettings = () => {
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

	const updateIngeladenTemplateTemplate = (key: any, value: string) => {
		ingeladenTemplate[key] = value;
		setnewTemplate(ingeladenTemplate);
	};

	const fetchTemplates = async () => {
		const res = await fetch(`/template?serial=X3462L7L`, { mode: "no-cors", method: "GET" });
		const json = await res.json();
		updateState("templates", json);
	};

	useEffect(() => {
		fetchTemplates();

		for (const templateI of state.templates) {
			if (templateI.name === template) {
				updateIngeladenTemplateTemplate("name", templateI.name);
				updateIngeladenTemplateTemplate("parts", templateI.parts);
				updateIngeladenTemplateTemplate("duration", templateI.duration);
			}
		}
	}, []);

	const { template } = getQuery();

	// let templates = [];

	return (
		<>
			<div className="p-templatesettings element">
				<header className="header">
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

				<h1 className="pagetitle">{ingeladenTemplate.name}</h1>

				<div className="content">
					<div className="item">
						<p className="title">template naam:</p>
						<UserSetting id="name" password={false} content={ingeladenTemplate.name} />
					</div>
					<div className="item">
						<p className="title">helften:</p>
						<UserSetting id="parts" password={false} content={ingeladenTemplate.parts} />
					</div>
					<div className="item">
						<p className="title">duur:</p>
						<UserSetting id="duration" password={false} content={ingeladenTemplate.duration} />
					</div>
				</div>
				<div className="p-templatesettings__btn">
					<IconButton label="OPSLAAN" color="white" />
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default TemplateSettings;
