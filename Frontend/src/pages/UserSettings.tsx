import { ChangeEvent, useLayoutEffect, useRef, useState } from "react";
import { LooseObject } from "../utils/Interfaces";
import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";

import BottomTab from "../components/BottomTab";
import UserSetting from "../components/UserSetting";
import IconButton from "../components/IconButton";

export const UserSettings = () => {
	const refThemeSwitch = useRef<HTMLInputElement>(null);
	const user: LooseObject = {
		currentUsername: "",
		newUsername: "",
		currentPassword: "",
		newPassword: "",
		checkNewPassword: "",
	};

	const onThemeChange = () => {
		console.log(refThemeSwitch.current?.checked);

		if (refThemeSwitch.current?.checked) {
			updateState("color", "dark");
		} else {
			updateState("color", "light");
		}
	};

	const updateUser = (key: any, value: string) => {
		user[key] = value;
	};

	const sendUpdates = async () => {
		console.log(user);

		if (user.newPassword == user.checkNewPassword) {
			const res = await fetch(`/changepassword`, {
				method: "PUT",
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
				},
				redirect: "follow",
				referrerPolicy: "no-referrer",
				body: JSON.stringify({ currentPassword: user.currentPassword, newPassword: user.newPassword }),
			});

			console.log("changed password");
		} else {
			console.log("password en bevestig password zijn niet hetzelfde!");
		}
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
						<UserSetting
							content="Jef"
							id="usernameInput"
							onChange={(event: React.FormEvent<HTMLInputElement>) => {
								updateUser("newUsername", event.currentTarget.value);
							}}
						/>
					</div>
					<div className="item">
						<p className="title">huidig wachtwoord:</p>
						<UserSetting
							id="currentPasswordnput"
							onChange={(event: React.FormEvent<HTMLInputElement>) => {
								updateUser("currentPassword", event.currentTarget.value);
							}}
						/>
					</div>
					<div className="item">
						<p className="title">nieuw wachtwoord:</p>
						<UserSetting
							id="newPasswordInput"
							onChange={(event: React.FormEvent<HTMLInputElement>) => {
								updateUser("newPassword", event.currentTarget.value);
							}}
						/>
					</div>
					<div className="item">
						<p className="title">bevestig nieuw wachtwoord:</p>
						<UserSetting
							id="confirmNewPasswordInput"
							onChange={(event: React.FormEvent<HTMLInputElement>) => {
								updateUser("checkNewPassword", event.currentTarget.value);
							}}
						/>
					</div>
				</div>
				<div className="buttons">
					<div>
						<p className="title">theme:</p>
						<label className="switch">
							<input ref={refThemeSwitch} type="checkbox" defaultChecked={true} onChange={onThemeChange} />
							<span className="slider"></span>
						</label>
					</div>
					<div className="save">
						<IconButton label="OPSLAAN" color="white" onClick={sendUpdates} />
					</div>
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default UserSettings;
