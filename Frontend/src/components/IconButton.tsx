import { ReactElement } from "React";

export const IconButton = ({ title, color, icon }: { title: string; color: string; icon?: ReactElement }) => {
	return (
		<button className={`c-iconbutton ${color} ${!icon ? "center" : ""}`}>
			<>{icon ? icon : <></>}</>
			{title}
		</button>
	);
};

export default IconButton;
