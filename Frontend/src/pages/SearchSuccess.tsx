import { Link } from "react-router-dom";
import { IconButton } from "../components/IconButton";
import BottomTab from "../components/BottomTab";

export const Search = () => {
	return (
		<>
			<div className="p-search">
				<header>
					<div className="p-search-topbar"></div>
					<div className="p-search-iconcontainer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="11rem"
							height="11rem"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round">
							<polyline points="9 11 12 14 22 4"></polyline>
							<path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
						</svg>
					</div>
				</header>
				<div className="p-search-message">
					<p>SCOREBORD GEVONDEN!</p>
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default Search;
