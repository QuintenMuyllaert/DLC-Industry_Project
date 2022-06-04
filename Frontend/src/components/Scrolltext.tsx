export const Scrolltext = ({ text }: { text: string }) => {
	return (
		<div className="c-scroll">
			<div style={{ animationDuration: `${0.25 * text.length}s` }} className="scrollcontainer">
				<h1>{text}</h1>
			</div>
			<h1 style={{ opacity: 0 }}>{text}</h1>
		</div>
	);
};

export default Scrolltext;
