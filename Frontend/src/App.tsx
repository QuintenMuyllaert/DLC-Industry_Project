import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MatchSetup from "./pages/MatchSetup";
import Score from "./pages/Score";
import Search from "./pages/Search";

import "./style/screen.scss";

export const App = () => {
	return (
		<Router>
			<div className="App dark">
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/score" element={<Score />} />
					<Route path="/matchsetup" element={<MatchSetup />} />
					<Route path="/search" element={<Search />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
