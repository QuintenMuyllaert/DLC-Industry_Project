export const Color = ({ color }: { color: string }) => {
	return <div className="c-colorpicker__colors-color" style={{ backgroundColor: color }}></div>;
};

export default Color;
