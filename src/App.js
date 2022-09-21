import React, { useContext, useEffect } from 'react';
import {
	Routes,
	Route,
	useLocation,
	useNavigate,
} from "react-router-dom";

import { appStore, onAppMount } from './state/app';
import { Header } from './components/Header';
import { Home } from './components/Home';

import './css/modal-ui.css';
import './App.scss';

const App = () => {
	const { state, dispatch, update } = useContext(appStore);

	const { app, wallet } = state
	const { menu } = app
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const onMount = () => {
		dispatch(onAppMount());
	};
	useEffect(onMount, []);

	const routeArgs = {
		state, update
	}

	return (
		<div>
			<Header {...{ pathname, menu, wallet, update }} />
			{
				wallet &&
				<main>
					<Routes>
				{
					wallet.accountId ?
					/* Account Paths */
					<>
						<Route path="/account" element={
							<>
								<p>Signed in as: {wallet.accountId}</p>
								<button onClick={() => {
									wallet.signOut()
									navigate('/')
								}}>Sign Out</button>
							</>
						} />
						<Route path="/about" element={
							<>
								<p>App is dope</p>
							</>
						} />
						<Route path="/" element={<Home {...routeArgs} />} />
					</>
								
							
					:
					/* Public Paths */
					<>
						<Route path="/about" element={
							<>
								<p>App is dope</p>
							</>
						} />
						<Route path="/" element={
							<>
								<p>Please sign in to get started</p>
								<button onClick={() => wallet.signIn()}>Sign In</button>
							</>
						} />
					</>
				}
					</Routes>
				</main>
			}
		</div>
	);
};

export default App;
