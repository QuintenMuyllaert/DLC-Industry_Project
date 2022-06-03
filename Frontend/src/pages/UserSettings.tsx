import { useState } from "react";
import { LooseObject } from "../utils/Interfaces";
import BottomTab from "../components/BottomTab";
import UserSetting from "../components/UserSetting";

export const UserSettings = () => {
	const template: LooseObject = {};

	const [newTemplate, setnewTemplate] = useState(template);

	const updateNewTemplate = (key: any, value: string) => {
		newTemplate[key] = value;
		setnewTemplate(newTemplate);
	};

	return (
		<>
			<div className="p-usersettings element">
				<header className="userheader">
					<div className="iconcontainer">
						<svg
							className="icon"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round">
							<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
							<circle cx="12" cy="7" r="4"></circle>
						</svg>
					</div>
					<h1>Hallo Jef</h1>
				</header>
				<div className="content">
					<div className="item">
						<p className="title">name:</p>
						<UserSetting content="Jef" />
					</div>
					<div className="item">
						<p className="title">email:</p>
						<UserSetting content="jef.bezos@gmail.com" />
					</div>
					<div className="item">
						<p className="title">wachtwoord:</p>
						<UserSetting content="●●●●●●●●●●" />
					</div>
				</div>
				<div className="buttons">
					<label className="switch">
						<input type="checkbox" />
						<span className="slider"></span>
					</label>
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default UserSettings;
