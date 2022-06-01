import { Link } from "react-router-dom";

export const Livestream = () => {
	return (
		<main className="p-livestream">
			<header>
				<div className="scoreboard">
					<div className="teamcolors">
						<div className="color-home-top"></div>
						<div className="color-home-bottom"></div>
					</div>
					<div className="score-container">
						<p className="score">1</p>
					</div>
					<div className="time-container">
						<p className="time">00:00</p>
					</div>
					<div className="score-container">
						<p className="score">0</p>
					</div>
					<div className="teamcolors">
						<div className="color-out-top"></div>
						<div className="color-out-bottom"></div>
					</div>
				</div>
			</header>
		</main>
	);
};

export default Livestream;
