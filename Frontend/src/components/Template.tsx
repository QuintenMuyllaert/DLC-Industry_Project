import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Template = ({ sportNaam, aantalHelften, duurHelft }: { sportNaam: string; aantalHelften: number; duurHelft: number }) => {
	const navigate = useNavigate();

	const [toDelete, setToDelete] = useState("");

	const goToTemplateSettings = async () => {
		//document.location.href = "/usersettings";
		// navigate("/templatesettings");
	};

	const handleClickDeletePopUp = (sportNaam: string) => {
		// console.log("hallo");
		setToDelete(sportNaam);
	};

	const handleClickNewTemplate = async () => {
		const res = await fetch(`/template?serial=X3462L7L`, {
			mode: "cors",
			method: "POST",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"content-type": "application/json",
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: JSON.stringify(toDelete),
		});
	};

	return (
		<article className="p-templates__list-item" onClick={goToTemplateSettings}>
			<div className="p-templates__list-info">
				<div className="p-templates__list-naam">
					<p>{sportNaam}</p>
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
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round">
							<circle cx="12" cy="12" r="10"></circle>
							<polyline points="12 6 12 12 12 16.5"></polyline>
						</svg>
						<p>{aantalHelften}</p>
					</div>
					<div className="p-templates__list-detail_duur">
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
							<path d="M5 22h14"></path>
							<path d="M5 2h14"></path>
							<path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path>
							<path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path>
						</svg>
						<p>{duurHelft}:00</p>
					</div>
				</div>
			</div>
			<div className="p-templates__list-btns">
				<button className="c-templates__list-btn">
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
						<line x1="18" y1="2" x2="22" y2="6"></line>
						<path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path>
					</svg>
				</button>
				<button
					className="c-templates__list-btn c-templates__list-delete"
					onClick={(e) => {
						e.preventDefault();
						handleClickDeletePopUp(sportNaam);
					}}>
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
						<polyline points="3 6 5 6 21 6"></polyline>
						<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
						<line x1="10" y1="11" x2="10" y2="17"></line>
						<line x1="14" y1="11" x2="14" y2="17"></line>
					</svg>
				</button>
			</div>
		</article>
	);
};

export default Template;
