export const BottomTab = () => {
	const goToTemplates = async () => {
		document.location.href = "/templates";
	};

	const goToCurrentMatch = async () => {
		document.location.href = "/score";
	};

	const goToUsers = async () => {
		document.location.href = "/users";
	};

	const goToUserSettings = async () => {
		document.location.href = "/usersettings";
	};

	return (
		<div className="c-bottomtab">
			<div className={document.location.pathname == "/templates" ? "c-bottomtab__page c-bottomtab__page-active" : "c-bottomtab__page"} onClick={goToTemplates}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="c-bottomtab__page-icon">
					<path d="M21 3H3v7h18V3z"></path>
					<path d="M21 14h-5v7h5v-7z"></path>
					<path d="M12 14H3v7h9v-7z"></path>
				</svg>
				<p className="c-bottomtab__page-name">Templates</p>
			</div>
			<div className={document.location.pathname == "/score" ? "c-bottomtab__page c-bottomtab__page-active" : "c-bottomtab__page"} onClick={goToCurrentMatch}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="c-bottomtab__page-icon">
					<rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
					<polyline points="17 2 12 7 7 2"></polyline>
				</svg>
				<p className="c-bottomtab__page-name">Match</p>
			</div>
			<div className={document.location.pathname == "/users" ? "c-bottomtab__page c-bottomtab__page-active" : "c-bottomtab__page"} onClick={goToUsers}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="c-bottomtab__page-icon">
					<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
					<circle cx="9" cy="7" r="4"></circle>
					<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
					<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
				</svg>
				<p className="c-bottomtab__page-name">Users</p>
			</div>
			<div
				className={document.location.pathname == "/usersettings" ? "c-bottomtab__page c-bottomtab__page-active" : "c-bottomtab__page"}
				onClick={goToUserSettings}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
					<circle cx="12" cy="12" r="3"></circle>
				</svg>
				<p className="c-bottomtab__page-name">Settings</p>
			</div>
		</div>
	);
};

export default BottomTab;
