import { Link } from "react-router-dom";
import { Flag } from "../components/Flag";
import { Clock } from "../components/Clock";
import { Digit } from "../components/Digit";
import { IconButton } from "../components/IconButton";

export const Login = () => {
	return (
		<div className="p-score">
			<Clock time="15:39"></Clock>

			<div className="scorevalue-container">
				<Flag top="red" bottom="green" />
				<div className="empty"></div>
				<Flag top="blue" bottom="yellow" />

				<Digit name="TORHOUT" value={2} />
				<p className="seperator">-</p>
				<Digit name="KORTRIJK" value={0} />
			</div>

			<IconButton
				icon={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
					</svg>
				}
				color="white"
				title="WIJZIG BERICHT"></IconButton>

			<div className="u-grid-horizontal-2">
				<IconButton color="white" title="Scorebord"></IconButton>
				<IconButton color="black" title="Sponsors"></IconButton>
			</div>
		</div>
	);
};

export default Login;
