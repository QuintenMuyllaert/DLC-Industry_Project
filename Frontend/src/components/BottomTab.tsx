export const BottomTab = () => {
	const goToTemplates = async () => {
		document.location.href = "/templates";
	};

	return (
		<div className="c-bottomtab">
			<div className="c-bottomtab__page c-bottomtab__page-active" onClick={goToTemplates}>
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
				<p className="c-bottomtab__page-name">Templates</p>
			</div>
			<div className="c-bottomtab__page">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					className="c-bottomtab__page-icon">
					<path d="M21 3H3v7h18V3z"></path>
					<path d="M21 14h-5v7h5v-7z"></path>
					<path d="M12 14H3v7h9v-7z"></path>
				</svg>
				<p className="c-bottomtab__page-name">Match</p>
			</div>
			<div className="c-bottomtab__page">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					className="c-bottomtab__page-icon">
					<rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
					<polyline points="17 2 12 7 7 2"></polyline>
				</svg>
				<p className="c-bottomtab__page-name">Users</p>
			</div>
		</div>
	);
};

export default BottomTab;
