export const Input = ({
	label,
	type,
	id,
	onChange,
	inputValue,
}: {
	label: string;
	type?: string;
	id?: string;
	onChange?: (event?: any) => any;
	inputValue?: any;
}) => {
	return (
		<div className="c-input">
			<label htmlFor={id}>{label}</label>
			<input id={id} type={type} onChange={onChange} value={inputValue} />
		</div>
	);
};

export default Input;
