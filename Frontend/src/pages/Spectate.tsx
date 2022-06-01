import { Link } from "react-router-dom";
import Clock from "../components/Clock";
import Flag from "../components/Flag";

export const Spectate = () => {
	return (
		<>
			<div className="p-spectate maxwidth">
				<header></header>
				<Clock time={0} />
				<div className="team">
					<div className="flag">
						<Flag top="#FF0000" bottom="#00FF5D" />
					</div>
					<h1 className="teamname">Torhout</h1>
					<p>2</p>
				</div>
				<div className="team">
					<h1 className="teamname">Kortrijk</h1>
					<p>0</p>
					<div className="flag">
						<Flag top="#1900FF" bottom="#FFEE00" />
					</div>
				</div>
			</div>
		</>
	);
};

export default Spectate;
