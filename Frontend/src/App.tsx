import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import MatchSetup from "./pages/MatchSetup";
import Score from "./pages/Score";

import Templates from "./pages/Templates";

import Search from "./pages/Search";
import SearchError from "./pages/SearchError";
import SearchSuccess from "./pages/SearchSuccess";
import Spectate from "./pages/Spectate";


import "./style/screen.scss";

export const App = () => {
	return (
		<Router>
			<div className="App dark">
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/score" element={<Score />} />

					<Route path="/templates" element={<Templates />} />

					<Route path="/matchsetup" element={<MatchSetup />} />
					<Route path="/search" element={<Search />} />
					<Route path="/searcherror" element={<SearchError />} />
					<Route path="/searchsuccess" element={<SearchSuccess />} />
					<Route path="/spectate" element={<Spectate />} />

				</Routes>
			</div>
		</Router>
	);
};

export default App;
