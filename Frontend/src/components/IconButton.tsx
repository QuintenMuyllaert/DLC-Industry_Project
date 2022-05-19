import { ReactElement } from "React";

export const IconButton = ({ title, color, icon }: { title: string; color: string; icon?: ReactElement }) => {
	return (
		<button className={`c-iconbutton ${color}`}>
			<>{icon ? icon : <div></div>}</>
			{title}
		</button>
	);
};

export default IconButton;
