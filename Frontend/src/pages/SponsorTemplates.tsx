import BottomTab from "../components/BottomTab";
import IconButton from "../components/IconButton";
import Logo from "../components/Logo";
import SponsorTemplate from "../components/sponsorTemplate";

export const SponsorTemplates = () => {
	return (
		<>
			<div className="p-sponsorTemplates element">
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
				<h1>Sponsor templates</h1>
				<div className="p-sponsorTemplates__list">
					<SponsorTemplate />
					<SponsorTemplate />
					<SponsorTemplate />
					<SponsorTemplate />
					<SponsorTemplate />
					<SponsorTemplate />
					<SponsorTemplate />
					<SponsorTemplate />
					<SponsorTemplate />
					<SponsorTemplate />
				</div>
				<div className="p-sponsorTemplates__btn">
					<IconButton
						color="white"
						label="Bundel toevoegen"
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
								<line x1="12" y1="5" x2="12" y2="19"></line>
								<line x1="5" y1="12" x2="19" y2="12"></line>
							</svg>
						}></IconButton>
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default SponsorTemplates;
