import { LooseObject } from "../utils/Interfaces";

export const User = ({ user }: { user: string }) => {
	const getRandomPassword = () => {
		//return randomized password
	};

	const requestBody: LooseObject = {
		user: user,
		serial: "X3462L7L",
	};

	const handleClickDeleteUser = async () => {
		const res = await fetch(`${document.location.origin}/user`, {
			method: "DELETE",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json",
			},
			redirect: "follow",
			referrerPolicy: "no-referrer",
			body: JSON.stringify(requestBody),
		});
	};

	return (
		<article className="c-user">
			<div className="card">
				<div className="username">
					<p>{user}</p>
				</div>
				<svg
					onClick={handleClickDeleteUser}
					className="icon"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round">
					<polyline points="3 6 5 6 21 6"></polyline>
					<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
					<line x1="10" y1="11" x2="10" y2="17"></line>
					<line x1="14" y1="11" x2="14" y2="17"></line>
				</svg>
			</div>
		</article>
	);
};

export default User;
