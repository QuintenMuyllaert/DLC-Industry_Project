import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Appstate from "./utils/Appstate";

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
import Users from "./pages/Users";

export const App = () => {
	Appstate.attachUseState(...useState(Appstate.defaultState));
	const state = Appstate.getGlobalState();

	return (
		<Router>
			<div className={`App ${state.color}`}>
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
					<Route path="/users" element={<Users />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
