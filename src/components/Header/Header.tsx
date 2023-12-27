import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import './header.css';

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { pathname } = location;
	const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
	const [userName, setUserName] = useState(localStorage.getItem('user'));

	useEffect(() => {
		setIsLoggedIn(localStorage.getItem('token'));
		setUserName(localStorage.getItem('user'));
	}, [pathname]);

	function onClickLogout() {
		localStorage.removeItem('token');
		navigate('/login');
	}

	return (
		<header>
			<Logo />
			{isLoggedIn && (
				<div className='logout_user_wrapper'>
					<p className='user_name'>{userName}</p>
					<Button
						onClick={onClickLogout}
						name='button_header'
						buttonText='Logout'
					/>
				</div>
			)}
		</header>
	);
};

export default Header;
