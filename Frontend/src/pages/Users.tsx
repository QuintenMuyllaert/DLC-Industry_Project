import { useEffect, useState } from "react";
import BottomTab from "../components/BottomTab";
import IconButton from "../components/IconButton";
import { updateGlobalState as updateState, globalState as state } from "../utils/Appstate";

import Input from "../components/Input";
import Logo from "../components/Logo";
import User from "../components/User";
import { LooseObject } from "../utils/Interfaces";

export const Users = () => {
	const generatePassword = () => {
		const a = Math.random();
		const b = a.toString(36).split(".").pop();
		return b;
	};

	const user: LooseObject = {
		username: "",
		password: generatePassword(),
		serial: state.serial,
	};

	const [newUser, setNewUser] = useState(user);
	const defaultUserList: JSX.Element[] = [];

	const [userlist, setNewUserlist] = useState(defaultUserList);

	useEffect(() => {
		fetchUsers();
	}, []);

	const updateNewUser = (key: any, value: string) => {
		newUser[key] = value;
		setNewUser(newUser);
	};

	const fetchUsers = async () => {
		const res = await fetch(`/user?serial=${state.serial}`, { mode: "no-cors", method: "GET" });
		const json = await res.json();
		updateState("users", json);
	};

	for (const userInList of state.users) {
		const tempUserList: JSX.Element[] = [];
		console.log(userInList);
		if (userInList.isAdmin == false) {
			tempUserList.push(<User username={userInList.username} />);
		}
		setNewUserlist(tempUserList);
	}

	const handleClickNewUser = async () => {
		const p = generatePassword();
		updateNewUser("password", String(p));

		const res = await fetch(`${document.location.origin}/register`, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: JSON.stringify(newUser),
		});

		if (navigator.share) {
			navigator
				.share({
					title: "web.dev",
					text: `Log nu in met deze user:\nusername: ${newUser.username}\nwachtwoord: ${newUser.password}`,
					url: `${document.location.origin}/login`,
				})
				.then(() => console.log("Successful share"))
				.catch((error) => console.log("Error sharing", error));
		}
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
				<div className="p-users__button">
					<IconButton label="Toevoegen" color="white" onClick={handleClickNewUser} />
				</div>

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
