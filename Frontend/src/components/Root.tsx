import { Link } from "react-router-dom";

export const Root = () => {
	return (
		<>
			<nav>
				<Link to="/about">About</Link>
			</nav>
			<main>
				<h1>Hello World</h1>
			</main>
		</>
	);
};

export default Root;
