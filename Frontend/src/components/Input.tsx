export const Input = ({ title, type }: { title: string; type?: string }) => {
	return (
		<div className="c-input">
			<label>{title}</label>
			<input type={type} />
		</div>
	);
};

export default Input;
