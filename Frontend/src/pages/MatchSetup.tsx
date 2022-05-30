import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import { IconButton } from "../components/IconButton";
import { LooseObject } from "../utils/Interfaces";
import Flag from "../components/Flag";
import BottomTab from "../components/BottomTab";

export const MatchSetup = () => {
	return (
		<>
			<div className="p-matchsetup maxwidth">
				<h1>Team instellingen</h1>
				<div className="teamsettings-container u-grid-vertical-gap">
					<div className="flagcontainer">
						<p>Thuis</p>
						<Flag top="#FF0000" bottom="#00FF66" />
					</div>
					<div className="flagcontainer">
						<p>uit</p>
						<Flag top="#1900FF" bottom="#F7FF00" />
					</div>
				</div>
				<h1>Match instellingen</h1>
				<div className="matchsettings-container">
					<div className="match-helft">
						<div className="helft">
							<Input label="Helften" type="number" id="helften-aantal" />
						</div>
						<div className="duur">
							<Input label="Duur helft" type="number" id="helften-tijd" />
						</div>
					</div>
					<Input label="Sponsor selectie" type="text" id="sponsors" />
				</div>
				<IconButton color="white" label="Start match"></IconButton>
			</div>
			<BottomTab />
		</>
	);
};

export default MatchSetup;
