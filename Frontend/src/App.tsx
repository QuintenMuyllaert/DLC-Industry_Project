import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Score from "./pages/Score";
import Templates from "./pages/Templates";

import "./style/screen.scss";

export const App = () => {
	return (
		<Router>
			<div className="App dark">
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/score" element={<Score />} />
					<Route path="/templates" element={<Templates />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
