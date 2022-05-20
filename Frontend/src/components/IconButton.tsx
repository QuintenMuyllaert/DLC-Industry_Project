import { ReactElement } from "React";

export const IconButton = ({ label, color, icon, onClick }: { label: string; color: string; icon?: ReactElement; onClick?: (event?: any) => any }) => {
	return (
		<button className={`c-iconbutton ${color} ${!icon ? "center" : ""}`} onClick={onClick ? onClick : () => {}}>
			<>{icon ? icon : <></>}</>
			{label}
		</button>
	);
};

export default IconButton;
