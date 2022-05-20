export const Input = ({ label, type, id, onChange }: { label: string; type?: string; id?: string; onChange?: (event?: any) => any }) => {
	return (
		<div className="c-input">
			<label htmlFor={id}>{label}</label>
			<input id={id} type={type} onChange={onChange} />
		</div>
	);
};

export default Input;
