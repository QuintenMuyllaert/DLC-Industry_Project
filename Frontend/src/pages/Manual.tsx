import { useState } from "react";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { IconButton } from "../components/IconButton";
import { LooseObject } from "../utils/Interfaces";

export const Manual = () => {
	const defaultState: LooseObject = {
		serial: "",
		username: "",
		password: "",
		confirmPassword: "",
		hasScoreboard: true,
	};

	const [state, setState] = useState(defaultState);

	const updateState = (key: string, value: any) => {
		state[key] = value;
		setState({ ...state });
	};

	const onCheck = () => {
		updateState("hasScoreboard", !state.hasScoreboard);
	};

	const sendRegisterRequest = async () => {
		console.log(state.hasScoreboard);

		if (state.password !== state.confirmPassword) {
			//TODO : Add an error message
			return;
		}

		if (state.hasScoreboard) {
			if (state.password !== state.confirmPassword) {
				//TODO : Add an error message
				return;
			}

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
				body: JSON.stringify({ ...state }),
			});

			if (res.status === 202 || res.status === 201) {
				document.location.href = "/score";
			}
		} else if (state.hasScoreboard == false) {
			updateState("serial", "virtual");

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
				body: JSON.stringify({ ...state }),
			});

			if (res.status === 202 || res.status === 201) {
				const res = await fetch(`/auth`, {
					method: "POST",
					mode: "cors",
					cache: "no-cache",
					credentials: "same-origin",
					headers: {
						"Content-Type": "application/json",
					},
					redirect: "follow",
					referrerPolicy: "no-referrer",
					body: JSON.stringify({ username: state.username, password: state.password }),
				});

				document.location.href = "/score";
			}
		}
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
					<Input
						id="serienummer"
						label="serienummer"
						type="text"
						disabled={!state.hasScoreboard}
						onChange={(event: React.FormEvent<HTMLInputElement>) => {
							updateState("serial", event.currentTarget.value);
						}}
					/>
					<Input
						id="username"
						label="username"
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
					<Input
						id="confirmpassword"
						label="bevestig wachtwoord"
						type="password"
						onChange={(event: React.FormEvent<HTMLInputElement>) => {
							updateState("confirmPassword", event.currentTarget.value);
						}}
					/>
					<div className="c-checkbox">
						<input type="checkbox" id="noScoreboaard" name="noScoreboaard" value="no" onClick={onCheck} />
						<label htmlFor="saveTemplate">Ik heb geen scorebord</label>
					</div>
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
						label="REGISTREREN"
						color="white"
						onClick={sendRegisterRequest}
					/>
				</div>
			</div>
		</div>
	);
};

export default Manual;
