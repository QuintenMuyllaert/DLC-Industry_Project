import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Logo } from "../components/Logo";
import { IconButton } from "../components/IconButton";

export const Login = () => {
	return (
		<div className="p-login">
			<header>
				<div className="p-login-topbar"></div>
				<div className="p-login-logocontainer">
					<Logo width="11rem" height="11rem" />
				</div>
			</header>

			<div className="u-grid-vertical-gap p-login-maxwidth">
				<Input title="e-mail" type="text" />
				<Input title="wachtwoord" type="password" />
			</div>
			<div className="u-grid-vertical-gap p-login-maxwidth">
				<IconButton title="LOGIN" color="white" />
				<IconButton title="SPECTATE" color="black" />
			</div>
		</div>
	);
};

export default Login;
