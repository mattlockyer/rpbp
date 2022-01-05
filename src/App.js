import React, { useContext, useEffect } from 'react';
import {
	Routes,
	Route,
	Link
} from "react-router-dom";

import { appStore, onAppMount } from './state/app';

import HelloMessage from './HelloMessage';

import './App.scss';

const App = () => {
	const { state, dispatch, update } = useContext(appStore);

	console.log('state', state);

	const onMount = () => {
		dispatch(onAppMount('world'));
	};
	useEffect(onMount, []);

	const handleClick = () => {
		update('clicked', !state.clicked);
	};

	return (
		<div>

			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/hello">Hello</Link>
					</li>
				</ul>
			</nav>

			<Routes>
				<Route path="/hello" element={
					<HelloMessage message={state.foo && state.foo.bar.hello} />
				} />
				<Route path="/" element={
					<>
					<p>clicked: {JSON.stringify(state.clicked)}</p>
					<button onClick={handleClick}>Click Me</button>
					</>
				} />
			</Routes>

		</div>
	);
};

export default App;
