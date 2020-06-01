import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Faq from './view/faq';
import Sample1 from './view/sample1';
import Sample2 from './view/sample2';
export default function App() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>

						<li>
							<Link to="/sample1">api call using hooks</Link>
						</li>
						<li>
							<Link to="/sample2">sample2</Link>
						</li>
					</ul>
				</nav>

				<Switch>
					<Route path="/sample2">
						<Sample2 />
					</Route>
					<Route path="/sample1">
						<Sample1 />
					</Route>
					<Route path="/">
						<Faq />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}
