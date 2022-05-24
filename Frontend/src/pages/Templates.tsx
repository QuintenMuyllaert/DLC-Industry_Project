import { useState } from "react";
import BottomTab from "../components/BottomTab";
import IconButton from "../components/IconButton";

import Input from "../components/Input";
import Logo from "../components/Logo";
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
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<line x1="19" y1="12" x2="5" y2="12"></line>
						<polyline points="12 19 5 12 12 5"></polyline>
					</svg>

					<Logo width="4rem" height="4rem" />
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
				<div className="p-templates__list">
					<article className="p-templates__list-item">
						<div className="p-templates__list-info">
							<div className="p-templates__list-naam">
								<p>Voetbal</p>
							</div>
							<div className="p-templates__list-detail">
								<div className="p-templates__list-detail_helften">
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
										<circle cx="12" cy="12" r="10"></circle>
										<polyline points="12 6 12 12 12 16.5"></polyline>
									</svg>
									<p>2</p>
								</div>
								<div className="p-templates__list-detail_duur">
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
										<path d="M5 22h14"></path>
										<path d="M5 2h14"></path>
										<path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
										<path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
									</svg>
									<p>45:00</p>
								</div>
							</div>
						</div>
						<div className="p-templates__list-btn">
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
								<line x1="18" y1="2" x2="22" y2="6"></line>
								<path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path>
							</svg>
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
								<polyline points="3 6 5 6 21 6"></polyline>
								<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
								<line x1="10" y1="11" x2="10" y2="17"></line>
								<line x1="14" y1="11" x2="14" y2="17"></line>
							</svg>
						</div>
					</article>

					<article className="p-templates__list-item">
						<div className="p-templates__list-info">
							<div className="p-templates__list-naam">
								<p>Voetbal</p>
							</div>
							<div className="p-templates__list-detail">
								<div className="p-templates__list-detail_helften">
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
										<circle cx="12" cy="12" r="10"></circle>
										<polyline points="12 6 12 12 12 16.5"></polyline>
									</svg>
									<p>2</p>
								</div>
								<div className="p-templates__list-detail_duur">
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
										<path d="M5 22h14"></path>
										<path d="M5 2h14"></path>
										<path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
										<path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
									</svg>
									<p>45:00</p>
								</div>
							</div>
						</div>
						<div className="p-templates__list-btn">
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
								<line x1="18" y1="2" x2="22" y2="6"></line>
								<path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path>
							</svg>
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
								<polyline points="3 6 5 6 21 6"></polyline>
								<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
								<line x1="10" y1="11" x2="10" y2="17"></line>
								<line x1="14" y1="11" x2="14" y2="17"></line>
							</svg>
						</div>
					</article>

					<article className="p-templates__list-item">
						<div className="p-templates__list-info">
							<div className="p-templates__list-naam">
								<p>Voetbal</p>
							</div>
							<div className="p-templates__list-detail">
								<div className="p-templates__list-detail_helften">
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
										<circle cx="12" cy="12" r="10"></circle>
										<polyline points="12 6 12 12 12 16.5"></polyline>
									</svg>
									<p>2</p>
								</div>
								<div className="p-templates__list-detail_duur">
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
										<path d="M5 22h14"></path>
										<path d="M5 2h14"></path>
										<path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
										<path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
									</svg>
									<p>45:00</p>
								</div>
							</div>
						</div>
						<div className="p-templates__list-btn">
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
								<line x1="18" y1="2" x2="22" y2="6"></line>
								<path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path>
							</svg>
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
								<polyline points="3 6 5 6 21 6"></polyline>
								<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
								<line x1="10" y1="11" x2="10" y2="17"></line>
								<line x1="14" y1="11" x2="14" y2="17"></line>
							</svg>
						</div>
					</article>

					<article className="p-templates__list-item">
						<div className="p-templates__list-info">
							<div className="p-templates__list-naam">
								<p>Voetbal</p>
							</div>
							<div className="p-templates__list-detail">
								<div className="p-templates__list-detail_helften">
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
										<circle cx="12" cy="12" r="10"></circle>
										<polyline points="12 6 12 12 12 16.5"></polyline>
									</svg>
									<p>2</p>
								</div>
								<div className="p-templates__list-detail_duur">
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
										<path d="M5 22h14"></path>
										<path d="M5 2h14"></path>
										<path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
										<path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
									</svg>
									<p>45:00</p>
								</div>
							</div>
						</div>
						<div className="p-templates__list-btn">
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
								<line x1="18" y1="2" x2="22" y2="6"></line>
								<path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path>
							</svg>
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
								<polyline points="3 6 5 6 21 6"></polyline>
								<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
								<line x1="10" y1="11" x2="10" y2="17"></line>
								<line x1="14" y1="11" x2="14" y2="17"></line>
							</svg>
						</div>
					</article>
				</div>
			</div>
			<BottomTab />
		</>
	);
};

export default Templates;
