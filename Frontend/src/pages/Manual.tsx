import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { IconButton } from "../components/IconButton";
import { LooseObject } from "../utils/Interfaces";

export const Manual = () => {
	const defaultState: LooseObject = {
		username: "",
		password: "",
	};

	const [state, setState] = useState(defaultState);

	return (
		<div className="p-manual">
			<div className="p-manual__header">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<line x1="19" y1="12" x2="5" y2="12"></line>
					<polyline points="12 19 5 12 12 5"></polyline>
				</svg>

				<Logo width="4rem" height="4rem" />
			</div>
			<div className="content">
				<div className="u-grid-vertical-gap">
					<Input id="serienummer" label="serienummer" type="text" />
					<Input id="username" label="e-mail" type="text" />
					<Input id="password" label="wachtwoord" type="password" />
					<Input id="confpassword" label="bevestig wachtwoord" type="password" />
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
					/>
				</div>
			</div>
		</div>
	);
};

export default Manual;
