import { useState } from "react";
import BottomTab from "../components/BottomTab";
import IconButton from "../components/IconButton";

import Input from "../components/Input";
import Logo from "../components/Logo";
import Template from "../components/Template";
import User from "../components/User";
import { LooseObject } from "../utils/Interfaces";

export const Users = () => {
	const template: LooseObject = {
		naam: "",
		aantalHelften: 0,
		duurHelft: 0,
	};

	const [newTemplate, setnewTemplate] = useState(template);

	const updateNewTemplate = (key: any, value: string) => {
		newTemplate[key] = value;
		setnewTemplate(newTemplate);
	};

	return (
		<>
			<div className="p-users element">
				<div className="header">
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

				<h1>Mensen toevoegen</h1>
				<Input
					id="addUsername"
					label="Naam"
					type="text"
					onChange={(event: React.FormEvent<HTMLInputElement>) => {
						updateNewTemplate("naamTemplate", event.currentTarget.value);
					}}
				/>

				<IconButton label="Toevoegen" color="white" />

				{/* <div className="userlist"> */}
				<h1 className="title">Deze mensen hebben toegang</h1>
				<div className="list scrollbar">
					<User userName="Milan" />
					<User userName="Quinten" />
					<User userName="Anton" />
					<User userName="Jef" />
					<User userName="Jos" />
					<User userName="Jezus" />
					<User userName="Peter" />
					<User userName="Glenn" />
				</div>
				{/* </div> */}
			</div>
			<BottomTab />
		</>
	);
};

export default Users;
