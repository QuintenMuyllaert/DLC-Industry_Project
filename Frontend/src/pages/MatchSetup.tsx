import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import { IconButton } from "../components/IconButton";
import { LooseObject } from "../utils/Interfaces";

export const MatchSetup = () => {
	const defaultState: LooseObject = {
		username: "",
		password: "",
	};

	const [state, setState] = useState(defaultState);

	const updateState = (key: string, value: string) => {
		state[key] = value;
		setState(state);
	};

	return (
		<div className="p-matchsetup">
			<header></header>

			<div className="u-grid-vertical-gap p-matchsetup-maxwidth"></div>
			<div className="u-grid-vertical-gap p-matchsetup-maxwidth"></div>
		</div>
	);
};

export default MatchSetup;
