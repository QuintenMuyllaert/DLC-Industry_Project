export const IconButton = ({ title, color }: { title: string; color: string }) => {
	return (
		<button className={`c-iconbutton ${color}`}>
			<div></div>
			{title}
		</button>
	);
};

export default IconButton;
