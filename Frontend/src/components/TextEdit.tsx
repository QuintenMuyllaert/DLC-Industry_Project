import IconButton from "./IconButton";

export const TextEdit = ({ active, handleClickMessage }: { active: boolean; handleClickMessage?: (event?: any) => any }) => {
	return (
		<>
			<div className={active ? "c-textedit__overlay" : "c-textedit__overlay c-textedit__hidden"}></div>
			<div className={active ? "c-textedit" : "c-textedit c-textedit__hidden"}>
				<div className="c-textedit__container">
					<div className="c-textedit__header">
						<p>Type hier je bericht:</p>
						<div className="c-textedit__header-btn">
							<button>
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
							</button>
							<button onClick={handleClickMessage ? handleClickMessage : () => {}}>
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
						<textarea placeholder="Oude tekst..." name="scrolltext" id="scrolltext"></textarea>
					</div>

					<IconButton color="black" label="Bericht verzenden"></IconButton>
				</div>
			</div>
		</>
	);
};

export default TextEdit;
