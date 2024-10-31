import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import OtherPage from './OtherPage';
import Fib from './Fib';

function App() {
	return (
		<Router>
			<div>
				<header>
					<Link to="/">Home</Link>
					<Link to="/otherpage">Other Page</Link>
				</header>
			</div>
			<Routes>
				<Route path="/" element={<Fib />} />
				<Route path="/otherpage" element={<OtherPage />} />
			</Routes>
		</Router>
	);
}

export default App;
