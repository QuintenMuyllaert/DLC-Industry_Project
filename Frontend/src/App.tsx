import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Appstate from "./utils/Appstate";

import Protect from "./components/Protect";
import Root from "./pages/Root";
import Login from "./pages/Login";
import MatchSetup from "./pages/MatchSetup";
import Score from "./pages/Score";
import Templates from "./pages/Templates";
import Spectate from "./pages/Spectate";
import Scoreboard from "./pages/Scoreboard";

import "./style/screen.scss";
import Manual from "./pages/Manual";
import ChangePassword from "./pages/ChangePassword";
import Livestream from "./pages/Livestream";
import Users from "./pages/Users";
import UserSettings from "./pages/UserSettings";

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
					<Route path="/scoreboard" element={<Scoreboard />} />
					<Route path="/changepassword" element={<ChangePassword />} />
					<Route path="/score" element={<Protect element={<Score />} />} />
					<Route path="/templates" element={<Protect element={<Templates />} />} />
					<Route path="/matchsetup" element={<Protect element={<MatchSetup />} />} />
					<Route path="/manual" element={<Manual />} />
					<Route path="/spectate" element={<Spectate />} />
					<Route path="/users" element={<Protect element={<Users />} />} />
					<Route path="/usersettings" element={<Protect element={<UserSettings />} />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
