import BottomTab from "../components/BottomTab";
import Logo from "../components/Logo";
import Sponsor from "../components/Sponsor";

export const Sponsors = () => {
	return (
		<>
			<div className="p-sponsors element">
				<div className="p-sponsorTemplates__header">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round">
						<line x1="19" y1="12" x2="5" y2="12"></line>
						<polyline points="12 19 5 12 12 5"></polyline>
					</svg>

					<Logo width="4rem" height="4rem" />
				</div>

				<h1>Naam bundel</h1>

				<div className="p-sponsors__list">
					<Sponsor />
					<Sponsor />
					<Sponsor />
					<Sponsor />
					<Sponsor />
					<Sponsor />
					<Sponsor />
					<Sponsor />
				</div>

				<div className="p-sponsors__add">
					<div className="p-sponsors__add-placeholder">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="30"
							height="30"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round">
							<line x1="12" y1="5" x2="12" y2="19"></line>
							<line x1="5" y1="12" x2="19" y2="12"></line>
						</svg>
					</div>
					<p>Nieuwe sponsor</p>
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default Sponsors;
