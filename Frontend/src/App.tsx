import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Root from "./pages/Root";
import Login from "./pages/Login";
import MatchSetup from "./pages/MatchSetup";
import Score from "./pages/Score";
import Templates from "./pages/Templates";
import Search from "./pages/Search";
import SearchError from "./pages/SearchError";
import SearchSuccess from "./pages/SearchSuccess";
import Spectate from "./pages/Spectate";

import "./style/screen.scss";
import Manual from "./pages/Manual";
import ChangePassword from "./pages/ChangePassword";
import Livestream from "./pages/Livestream";

export const App = () => {
	return (
		<Router>
			<div className="App dark">
				<Routes>
					<Route path="/" element={<Root />} />
					<Route path="/login" element={<Login />} />
					<Route path="/livestream" element={<Livestream />} />
					<Route path="/changepassword" element={<ChangePassword />} />
					<Route path="/score" element={<Score />} />
					<Route path="/templates" element={<Templates />} />
					<Route path="/matchsetup" element={<MatchSetup />} />
					<Route path="/manual" element={<Manual />} />
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
