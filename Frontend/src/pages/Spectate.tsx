import { Link } from "react-router-dom";
import { IconButton } from "../components/IconButton";
import BottomTab from "../components/BottomTab";
import Clock from "../components/Clock";

export const Spectate = () => {
	return (
		<>
			<div className="p-spectate">
				<header></header>
				<Clock time="15:39" />
			</div>
			<BottomTab />
		</>
	);
};

export default Spectate;
