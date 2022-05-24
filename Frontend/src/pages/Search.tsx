import { Link } from "react-router-dom";
import BottomTab from "../components/BottomTab";
import Logo from "../components/Logo";

export const Search = () => {
	return (
		<>
			<div className="p-search">
				<header>
					<div className="p-search-topbar"></div>
					<div className="p-search-iconcontainer">
						<Logo width="11rem" height="11rem" />
					</div>
				</header>
				<div className="p-search-message">
					<p>SCOREBORD ZOEKEN</p>
					<p>EVEN GEDULD</p>
					<p>. . .</p>
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default Search;
