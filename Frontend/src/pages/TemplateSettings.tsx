import { useState } from "react";
import { LooseObject } from "../utils/Interfaces";
import BottomTab from "../components/BottomTab";
import UserSetting from "../components/UserSetting";
import IconButton from "../components/IconButton";
import Logo from "../components/Logo";

export const TemplateSettings = () => {
	const template: LooseObject = {};

	const [newTemplate, setnewTemplate] = useState(template);

	const updateNewTemplate = (key: any, value: string) => {
		newTemplate[key] = value;
		setnewTemplate(newTemplate);
	};

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

				<h1 className="pagetitle">Voetbal jeugd</h1>

				<div className="content">
					<div className="item">
						<p className="title">template naam:</p>
						<UserSetting content="Voetbal jeugd" />
					</div>
					<div className="item">
						<p className="title">helften:</p>
						<UserSetting content="2" />
					</div>
					<div className="item">
						<p className="title">duur:</p>
						<UserSetting content="30 minuten" />
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
