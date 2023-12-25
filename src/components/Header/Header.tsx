import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import './header.css';
import { logoutUser } from '../../store/user/userSlice';
type UserType = {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
};

const Header = () => {
	const userState = useSelector(
		(state: { user: UserType }) => state.user as UserType
	);
	//eslint-disable-next-line
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const { pathname } = location;
	//eslint-disable-next-line
	const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
	//eslint-disable-next-line
	const [user] = useState(localStorage.getItem('user'));

	useEffect(() => {
		setIsLoggedIn(localStorage.getItem('token'));
	}, [pathname]);

	function onClickLogout() {
		localStorage.removeItem('token');
		dispatch(logoutUser());
		navigate('/login');
	}

	return (
		<header>
			<Logo />
			{userState.isAuth && (
				<div className='logout_user_wrapper'>
					<p className='user_name'>{userState.name}</p>
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
