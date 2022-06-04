import Clock from "../components/Clock";
import Flag from "../components/Flag";
import Scrolltext from "../components/Scrolltext";

export const Scoreboard = () => {
	return (
		<div className="p-scoreboard">
			<div className="scoreboardtop">
				<header>
					<div className="team">
						<div className="flag">
							<Flag top="#FF0000" bottom="#00FF5D" />
						</div>
					</div>
					<Clock time={0} />
					<div className="team">
						<div className="flag">
							<Flag top="#1900FF" bottom="#FFEE00" />
						</div>
					</div>
				</header>
				<section>
					<h1 className="teamname">Torhout</h1>
					<h3 style={{ opacity: 0 }}>-</h3>
					<h1 className="teamname">Kortrijk</h1>
				</section>
				<main>
					<h2 className="teamscore">2</h2>
					<h2 className="teamscore">0</h2>
				</main>
			</div>
			<footer>
				<Scrolltext text={"DLC Sportsystems QMA Simulator"} />
			</footer>
		</div>
	);
};

export default Scoreboard;
