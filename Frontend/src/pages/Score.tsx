import { Link } from "react-router-dom";
import { Flag } from "../components/Flag";
import { Clock } from "../components/Clock";
import { Digit } from "../components/Digit";
import { IconButton } from "../components/IconButton";

export const Score = () => {
	return (
		<>
			<div className="p-score">
				<Clock time="15:39"></Clock>

				<div className="scorevalue-container">
					<Flag top="red" bottom="green" />
					<div className="empty"></div>
					<Flag top="blue" bottom="yellow" />

					<h2 className="teamname">{"TORHOUT"}</h2>
					<div className="empty"></div>
					<h2 className="teamname">{"KORTRIJK"}</h2>

					<Digit value={2} style="^v" />
					<p className="seperator">-</p>
					<Digit value={0} style="^v" />
				</div>

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
							<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
						</svg>
					}
					color="white"
					label="WIJZIG BERICHT"></IconButton>

				<div className="u-grid-horizontal-2">
					<IconButton color="white" label="Scorebord"></IconButton>
					<IconButton color="black" label="Sponsors"></IconButton>
				</div>
			</div>
			<div className="c-bottomtab"></div>
		</>
	);
};

export default Score;
