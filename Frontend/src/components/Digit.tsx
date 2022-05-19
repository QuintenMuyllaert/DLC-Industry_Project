export const Digit = ({ name, value }: { name: string; value: number }) => {
	return (
		<div className="c-digit">
			<h2 className="teamname">{name}</h2>
			<p className="teamscore">{value}</p>

			<div className="controlpanel">
				<button>-</button>
				<button>+</button>
			</div>
		</div>
	);
};

export default Digit;
