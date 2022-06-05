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
					{/* <Input id="template" label="Template selecteren" type="text" /> */}

					<div className="c-option">
						<label htmlFor="selectedTemplate">Template selecteren</label>
						<select id="selectedTemplate">
							<option value="voetbal">Voetbal</option>
							<option value="voetbaljeugd">Voetbal jeugd</option>
						</select>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round">
							<polyline points="6 9 12 15 18 9"></polyline>
						</svg>
					</div>

					<Input id="sport" label="Naam sport" type="text" />

					<div className="match-helft">
						<div className="helft">
							<Input label="Helften" type="number" id="helften-aantal" />
						</div>
						<div className="duur">
							<Input label="Duur helft" type="number" id="helften-tijd" />
						</div>
					</div>
					<div className="c-checkbox">
						<input type="checkbox" id="saveTemplate" name="saveTemplate" value="Yes" />
						<label htmlFor="saveTemplate">Deze instellingen opslaan als template</label>
					</div>
				</div>
				<IconButton color="white" label="Start match"></IconButton>
			</div>
			<BottomTab />
		</>
	);
};

export default MatchSetup;
