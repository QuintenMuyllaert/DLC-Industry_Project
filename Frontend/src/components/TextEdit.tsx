import { useState } from "react";
import { LooseObject } from "../utils/Interfaces";
import IconButton from "./IconButton";
import { scoreboardInterface } from "../utils/ScoreboardInterface";
import { trigger } from "../utils/Networking";

export const TextEdit = ({
	active,
	onClickSendMessage,
	handleClickMessage,
	handleClickSendMessage,
}: {
	active: boolean;
	onClickSendMessage?: (event?: any) => any;
	handleClickMessage?: (event?: any) => any;
	handleClickSendMessage?: (event?: any) => any;
}) => {
	const defaultState: LooseObject = {
		API: "http://localhost:1234",
		message: "",
	};

	const [state, setState] = useState(defaultState);

	const updateState = (key: string, value: string) => {
		if (state[key] == value) {
			return;
		}
		state[key] = value;
		setState(state);
	};

	const onTextUpdate = (event: any) => {
		updateState("message", event.target.value);
	};

	const handleClickSend = (handleClick: any) => {
		console.log("hoi");
		console.log(handleClick);

		handleClick ? handleClick : () => {};
	};

	const handleSend = () => {
		// console.log("c", handleClickMessage, onClickSendMessage);

		handleClickMessage ? handleClickMessage : () => {};
		// scoreboardInterface.sendMessage(state.message);
		onClickSendMessage
			? onClickSendMessage
			: () => {
					console.log("sending message :", state.message);
					scoreboardInterface.sendMessage(state.message);
					handleClickMessage;
			  };
	};

	return (
		<>
			<div className={active ? "c-textedit__overlay" : "c-textedit__overlay c-textedit__hidden"}></div>
			<div className={active ? "c-textedit" : "c-textedit c-textedit__hidden"}>
				<div className="c-textedit__container">
					<div className="c-textedit__header">
						<p>Type hier je bericht:</p>
						<div className="c-textedit__header-btn">
							{/* <button>
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
									<path d="M3 2v6h6"></path>
									<path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path>
								</svg>
							</button> */}
							<button onClick={handleClickMessage ? handleClickMessage : () => {}}>
								{/* <link href="#" onClick={(event) => { func1(event); func2();}}>Trigger here</link> */}
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
									<line x1="18" y1="6" x2="6" y2="18"></line>
									<line x1="6" y1="6" x2="18" y2="18"></line>
								</svg>
							</button>
						</div>
					</div>
					<div className="c-textedit__textarea">
						<label htmlFor="scrolltext">Tekst</label>
						<textarea placeholder="Oude tekst..." name="scrolltext" id="scrolltext" onChange={onTextUpdate}></textarea>
					</div>

					<IconButton
						color="black"
						label="Bericht verzenden"
						onClick={(event) => {
							handleClickSendMessage ? handleClickSendMessage(state.message) : () => {};
						}}></IconButton>
				</div>
			</div>
		</>
	);
};

export default TextEdit;
