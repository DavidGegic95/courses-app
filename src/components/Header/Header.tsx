import React from 'react';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import './header.css';

const Header = () => {
	return (
		<header>
			<Logo />
			<Button name='button_header' buttonText='Logout' />
		</header>
	);
};

export default Header;
