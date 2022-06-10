import { useEffect, useState } from "react";
import BottomTab from "../components/BottomTab";
import IconButton from "../components/IconButton";
import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";

import Input from "../components/Input";
import Logo from "../components/Logo";
import User from "../components/User";
import { LooseObject } from "../utils/Interfaces";

export const Users = () => {
	const user: LooseObject = {
		serial: "X3462L7L",
		username: "",
		password: "password",
	};

	const [newUser, setNewUser] = useState(user);

	let userlist = [];

	useEffect(() => {
		fetchUsers();
	}, []);

	const updateNewUser = (key: any, value: string) => {
		newUser[key] = value;
		setNewUser(newUser);
	};

	const fetchUsers = async () => {
		const res = await fetch(`/register?serial=X3462L7L`, { mode: "no-cors", method: "GET" });
		const json = await res.json();
		updateState("users", json);
	};

	for (const template of state.templates) {
		userlist.push(<User userName={template.username} />);
	}

	const handleClickNewUser = async () => {
		const res = await fetch(`${document.location.origin}/register`, {
			mode: "no-cors",
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(user),
		});
	};

	return (
		<>
			<div className="p-users element">
				<div className="header">
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

				<h1>Mensen toevoegen</h1>
				<Input
					id="newUsername"
					label="Naam"
					type="text"
					onChange={(event: React.FormEvent<HTMLInputElement>) => {
						updateNewUser("username", event.currentTarget.value);
					}}
				/>

				<IconButton label="Toevoegen" color="white" onClick={handleClickNewUser} />

				{/* <div className="userlist"> */}
				<h1 className="subtitle">Deze mensen hebben toegang</h1>
				<div className="list scrollbar">{userlist}</div>
				{/* </div> */}
			</div>
			<BottomTab />
		</>
	);
};

export default Users;
