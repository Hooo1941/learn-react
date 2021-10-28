import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import Game from './Game';
import Search from './Search';

const Home = () => (
	<div>
		<h2>Home</h2>
	</div>
);

const MyRouter = () => (
	<Router>
		<div>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/Game">Game</Link></li>
				<li><Link to="/Search">Search</Link></li>
			</ul>

			<hr />

			<Route exact path="/" component={Home} />
			<Route path="/Game" component={Game} />
			<Route path="/Search" component={Search} />
		</div>
	</Router>
);
export default MyRouter;