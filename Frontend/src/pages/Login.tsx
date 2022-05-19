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
					title="LOGIN"
					color="white"
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
					title="SPECTATE"
					color="black"
				/>
			</div>
		</div>
	);
};

export default Login;
