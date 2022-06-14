import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { IconButton } from "../components/IconButton";
import { LooseObject } from "../utils/Interfaces";

export const ChangePassword = () => {
	const localState: LooseObject = {
		currentUsername: "",
		oldPassword: "",
		password: "",
		checkPassword: "",
	};

	const [state, setState] = useState(localState);
	const navigate = useNavigate();

	const fetchStatus = async () => {
		const res = await fetch(`/status`, { mode: "no-cors", method: "GET" });
		const json = await res.json();
		updateState("currentUsername", json.username);
	};

	fetchStatus();

	const updateState = (key: string, value: any) => {
		state[key] = value;
		setState({ ...state });
	};

	const fetchChangePassword = async () => {
		if (state.password == state.checkPassword) {
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
				body: JSON.stringify({ currentPassword: state.oldPassword, newPassword: state.password }),
			});

			await res.json;

			console.log("changed password: ", state.password);
			const res2 = await fetch(`/auth`, {
				method: "POST",
				mode: "cors",
				cache: "no-cache",
				credentials: "same-origin",
				headers: {
					"Content-Type": "application/json",
				},
				redirect: "follow",
				referrerPolicy: "no-referrer",
				body: JSON.stringify({ username: state.currentUsername, password: state.password }),
			});

			await res2.json;

			sessionStorage.setItem("password", "");

			navigate("/score");
		} else {
			console.log("password and confirm password are not the same");
		}
	};

	const onChangePassword = async () => {
		updateState("oldPassword", sessionStorage.getItem("password"));

		await fetchChangePassword();
	};

	return (
		<div className="p-manual">
			<div className="p-manual__header">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="white"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round">
					<line x1="19" y1="12" x2="5" y2="12"></line>
					<polyline points="12 19 5 12 12 5"></polyline>
				</svg>

				<Logo width="4rem" height="4rem" />
			</div>
			<div className="content">
				<div className="u-grid-vertical-gap">
					<div className="text">
						<p>Welkom {state.currentUsername}!</p>
						<p>Kies hier je nieuwe wachtwoord</p>
					</div>

					<Input
						id="password"
						label="wachtwoord"
						type="password"
						onChange={(event: React.FormEvent<HTMLInputElement>) => {
							updateState("password", event.currentTarget.value);
						}}
					/>
					<Input
						id="confpassword"
						label="bevestig wachtwoord"
						type="password"
						onChange={(event: React.FormEvent<HTMLInputElement>) => {
							updateState("checkPassword", event.currentTarget.value);
						}}
					/>
				</div>
				<div className="button">
					<IconButton
						icon={
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
								<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
								<polyline points="10 17 15 12 10 7"></polyline>
								<line x1="15" y1="12" x2="3" y2="12"></line>
							</svg>
						}
						label="BEVESTIGEN"
						color="white"
						onClick={onChangePassword}
					/>
				</div>
			</div>
		</div>
	);
};

export default ChangePassword;
