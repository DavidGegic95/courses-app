import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import './header.css';

const Header = () => {
	const location = useLocation();
	const { pathname } = location;
	const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));

	useEffect(() => {
		setIsLoggedIn(localStorage.getItem('token'));
	}, [pathname]);

	return (
		<header>
			<Logo />
			{isLoggedIn && <Button name='button_header' buttonText='Logout' />}
		</header>
	);
};

export default Header;
