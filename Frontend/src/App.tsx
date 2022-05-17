import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Root from "./components/Root";
import About from "./components/About";

import "./style/screen.scss";

export const App = () => {
	return (
		<Router>
			<div className="App dark">
				<Routes>
					<Route path="/" element={<Root />} />
					<Route path="about" element={<About />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
