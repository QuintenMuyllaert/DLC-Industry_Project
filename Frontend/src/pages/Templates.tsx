import { useState } from "react";
import BottomTab from "../components/BottomTab";
import IconButton from "../components/IconButton";

import Input from "../components/Input";
import Logo from "../components/Logo";
import Template from "../components/Template";
import { LooseObject } from "../utils/Interfaces";

export const Templates = () => {
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
			<div className="p-templates">
				<div className="p-templates__header">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<line x1="19" y1="12" x2="5" y2="12"></line>
						<polyline points="12 19 5 12 12 5"></polyline>
					</svg>

					<svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 147.45 147.45">
						<rect x="56.51" y="137.29" width="5.3" height="7.48" rx="0.13" />
						<path d="M147.45,147.45H0V0H147.45ZM5.37,142.09H142.09V5.37H5.37Z" />
						<rect x="56.51" y="73.24" width="5.3" height="43.36" rx="0.51" />
						<rect x="56.51" y="2.37" width="5.3" height="57.47" rx="0.51" />
						<path d="M46.46,73.6H42a.44.44,0,0,0-.44.44V85.39H29.1c-4.23,0-8.77,2.15-8.77,8.84v14.83c0,6,4.54,8.15,8.69,8.15h6.15a7.87,7.87,0,0,0,6.43-3.69v2.64a.44.44,0,0,0,.44.44h4.42a.44.44,0,0,0,.44-.44V74A.43.43,0,0,0,46.46,73.6ZM35.55,112.22H29.48a3.75,3.75,0,0,1-3.92-3.92V94.54c0-2.92,1.84-4.23,3.69-4.23H41.6V107.2C40.15,111.59,37.22,112.22,35.55,112.22Z" />
						<path d="M92.38,105.36a.49.49,0,0,0-.49.49v2.22c0,2.92-1.85,4.22-3.69,4.22-.47,0-6.61-.07-8.22-.07a3.75,3.75,0,0,1-3.92-3.92V94.54c0-2.92,1.84-4.23,3.69-4.23.46,0,6.6.08,8.22.08a3.75,3.75,0,0,1,3.92,3.92V96.1a.49.49,0,0,0,.49.49h4.25a.49.49,0,0,0,.49-.49V93.54c0-6-4.54-8.15-8.69-8.15H79.59c-4.23,0-8.76,2.15-8.76,8.84v14.83c0,6,4.53,8.15,8.68,8.15h8.84c4.23,0,8.77-2.15,8.77-8.84v-2.52a.49.49,0,0,0-.49-.49Z" />
						<path d="M21.07,129.08l.35-.8a3.14,3.14,0,0,0,1.83.61c.87,0,1.23-.31,1.23-.72,0-1.2-3.29-.41-3.29-2.47,0-.9.71-1.66,2.23-1.66a3.59,3.59,0,0,1,1.85.49l-.33.8a3.09,3.09,0,0,0-1.53-.43c-.85,0-1.2.33-1.2.75,0,1.18,3.28.41,3.28,2.44,0,.89-.72,1.65-2.24,1.65A3.6,3.6,0,0,1,21.07,129.08Z" />
						<path d="M31.64,126.09c0,1.22-.9,2-2.36,2H28v1.6H27v-5.54h2.28C30.74,124.12,31.64,124.86,31.64,126.09Zm-1,0c0-.7-.47-1.1-1.37-1.1H28v2.2h1.21C30.14,127.19,30.61,126.79,30.61,126.09Z" />
						<path d="M32.84,126.89a3,3,0,1,1,3,2.85A2.84,2.84,0,0,1,32.84,126.89Zm4.94,0a2,2,0,1,0-2,2A1.9,1.9,0,0,0,37.78,126.89Z" />
						<path d="M44,129.66,42.88,128H41.42v1.61h-1v-5.54h2.28c1.46,0,2.36.74,2.36,2a1.77,1.77,0,0,1-1.18,1.75l1.28,1.82ZM42.62,125h-1.2v2.21h1.2c.91,0,1.37-.41,1.37-1.11S43.53,125,42.62,125Z" />
						<path d="M47.71,125H45.87v-.87h4.71V125H48.74v4.67h-1Z" />
						<path d="M54.05,129.08l.35-.8a3.14,3.14,0,0,0,1.83.61c.87,0,1.23-.31,1.23-.72,0-1.2-3.29-.41-3.29-2.47,0-.9.71-1.66,2.23-1.66a3.55,3.55,0,0,1,1.84.49l-.32.8a3.12,3.12,0,0,0-1.53-.43c-.85,0-1.2.33-1.2.75,0,1.18,3.28.41,3.28,2.44,0,.89-.72,1.65-2.24,1.65A3.6,3.6,0,0,1,54.05,129.08Z" />
						<path d="M62.25,127.71v2h-1v-1.94l-2.17-3.6h1.1l1.62,2.7,1.64-2.7h1Z" />
						<path d="M65,129.08l.35-.8a3.14,3.14,0,0,0,1.83.61c.87,0,1.23-.31,1.23-.72,0-1.2-3.29-.41-3.29-2.47,0-.9.71-1.66,2.23-1.66a3.55,3.55,0,0,1,1.84.49l-.32.8a3.12,3.12,0,0,0-1.53-.43c-.85,0-1.2.33-1.2.75,0,1.18,3.28.41,3.28,2.44,0,.89-.72,1.65-2.24,1.65A3.6,3.6,0,0,1,65,129.08Z" />
						<path d="M72,125H70.14v-.87h4.7V125H73v4.67H72Z" />
						<path d="M80.26,128.8v.86H76.11v-5.54h4V125h-3v1.44h2.67v.85H77.14v1.53Z" />
						<path d="M87,129.66V126l-1.82,3H84.7l-1.82-3v3.62h-1v-5.54h.85l2.2,3.67,2.16-3.67H88v5.54Z" />
						<path d="M89.48,129.08l.36-.8a3.08,3.08,0,0,0,1.82.61c.87,0,1.23-.31,1.23-.72,0-1.2-3.29-.41-3.29-2.47,0-.9.71-1.66,2.23-1.66a3.59,3.59,0,0,1,1.85.49l-.33.8a3.09,3.09,0,0,0-1.53-.43c-.85,0-1.2.33-1.2.75,0,1.18,3.29.41,3.29,2.44,0,.89-.73,1.65-2.25,1.65A3.6,3.6,0,0,1,89.48,129.08Z" />
					</svg>
				</div>
				<h1>Nieuwe template toevoegen</h1>
				<Input
					id="naamTemplate"
					label="Naam sport"
					type="text"
					onChange={(event: React.FormEvent<HTMLInputElement>) => {
						updateNewTemplate("naamTemplate", event.currentTarget.value);
					}}
				/>

				<div className="p-templates__formgroup">
					<Input
						id="aantalHelften"
						label="Aantal helften"
						type="number"
						onChange={(event: React.FormEvent<HTMLInputElement>) => {
							updateNewTemplate("aantalHelften", event.currentTarget.value);
						}}
					/>

					<Input
						id="duurHelft"
						label="Duur helft"
						type="number"
						onChange={(event: React.FormEvent<HTMLInputElement>) => {
							updateNewTemplate("duurHelft", event.currentTarget.value);
						}}
					/>
				</div>

				<IconButton label="Toevoegen" color="white" />

				<h1>Bestaande templates</h1>
				<div className="p-templates__list scrollbar">
					<Template sportNaam="Voetbal" aantalHelften={2} duurHelft="45:00" />
					<Template sportNaam="Voetbal jeugd" aantalHelften={4} duurHelft="20:00" />
					<Template sportNaam="Voetbal" aantalHelften={2} duurHelft="45:00" />
					<Template sportNaam="Voetbal" aantalHelften={2} duurHelft="45:00" />
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default Templates;
