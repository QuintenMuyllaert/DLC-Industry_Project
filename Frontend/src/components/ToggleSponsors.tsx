import { globalState as state } from "../utils/Appstate";
export const ToggleSponsors = ({ handleClickToggle }: { handleClickToggle: (event?: any) => any }) => {
	return (
		<div className="c-scorebordToggle">
			<div className={`c-scorebordToggle__active c-scorebordToggle__active-${state.scorbordSponsorsToggle}`}></div>
			<div className="c-scorebordToggle__btn-container">
				<button
					className="c-scorebordToggle__btn c-scorebordToggle__scorebord"
					onClick={() => {
						handleClickToggle("left");
					}}>
					Scorebord
				</button>
				<button
					className="c-scorebordToggle__btn c-scorebordToggle__sponsors"
					onClick={() => {
						handleClickToggle("right");
					}}>
					Sponsors
				</button>
			</div>
		</div>
	);
};

export default ToggleSponsors;
