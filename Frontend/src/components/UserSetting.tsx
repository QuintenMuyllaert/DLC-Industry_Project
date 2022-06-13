export const UserSetting = ({ content, id, onChange }: { content?: string; id: string; onChange?: (event?: any) => any }) => {
	return (
		<article className="c-usersetting">
			<div className="card">
				<div className="content">
					<input id={id} type="text" placeholder={content} onChange={onChange} />
				</div>
				<svg
					className="icon"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round">
					<line x1="18" y1="2" x2="22" y2="6"></line>
					<path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path>
				</svg>
			</div>
		</article>
	);
};

export default UserSetting;
