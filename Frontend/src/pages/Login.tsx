import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { IconButton } from "../components/IconButton";
import { LooseObject } from "../utils/Interfaces";

export const Login = () => {
	const defaultState: LooseObject = {
		username: "",
		password: "",
	};

	const [state, setState] = useState(defaultState);

	const updateState = (key: string, value: string) => {
		state[key] = value;
		setState(state);
	};

	const sendAuthRequest = async () => {
		const res = await fetch(`${document.location.origin}/auth`, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: JSON.stringify(state),
		});

		if (res.status === 202) {
			document.location.href = "/score";
		}
	};

	const sendRegisterRequest = async () => {
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
			body: JSON.stringify({ ...state, serialnumber: "001d5010184a" }),
		});

		if (res.status === 202 || res.status === 201) {
			document.location.href = "/score";
		}
	};

	return (
		<div className="p-login">
			<header>
				<div className="p-login-topbar"></div>
				<div className="p-login-logocontainer">
					<Logo width="11rem" height="11rem" />
				</div>
			</header>

			<div className="u-grid-vertical-gap p-login-maxwidth">
				<Input
					id="username"
					label="e-mail"
					type="text"
					onChange={(event: React.FormEvent<HTMLInputElement>) => {
						updateState("username", event.currentTarget.value);
					}}
				/>
				<Input
					id="password"
					label="wachtwoord"
					type="password"
					onChange={(event: React.FormEvent<HTMLInputElement>) => {
						updateState("password", event.currentTarget.value);
					}}
				/>
			</div>
			<div className="u-grid-vertical-gap p-login-maxwidth">
				<IconButton
					icon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
							<polyline points="10 17 15 12 10 7"></polyline>
							<line x1="15" y1="12" x2="3" y2="12"></line>
						</svg>
					}
					label="LOGIN"
					color="white"
					onClick={sendAuthRequest}
				/>
				<IconButton
					icon={
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<path d="M2 12S5 5 12 5s10 7 10 7-3 7-10 7S2 12 2 12Z"></path>
							<circle cx="12" cy="12" r="3"></circle>
						</svg>
					}
					label="SPECTATE"
					color="black"
					onClick={sendRegisterRequest} //TODO : move this to an actual register page
				/>
			</div>
		</div>
	);
};

export default Login;
