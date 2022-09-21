import React from 'react'
import {
	Routes,
	Route,
	Link
} from "react-router-dom";

import './Header.scss';

import { Menu } from 'react-feather';

const Links = ({ update, wallet }) => {
	const hideMenu = () => update('app.menu', false)
	return <nav>
		<Link onClick={hideMenu} to="/">Home</Link>
		<Link onClick={hideMenu} to="/about">About</Link>
		{
			wallet?.accountId && <>
				<Link onClick={hideMenu} to="/account">Account</Link>
			</>
		}
	</nav>
}

export const Header = ({ pathname, menu, wallet, update }) => {
	return <header>
		<div>
			<p>
				App { pathname.length > 1 && '/ ' + pathname.substring(1) }
			</p>
		</div>
		<div>
			<Menu onClick={() => update('app', { menu: !menu })} />
			<Links {...{ update, wallet }} />
		</div>
		{menu && window.innerWidth < 768 && <Links {...{ update, wallet }} />}
	</header>
}