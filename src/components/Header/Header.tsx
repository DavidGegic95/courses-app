import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import './header.css';
import { loginUser, logoutUser } from '../../store/user/actions';
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
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const { pathname } = location;

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(
				loginUser({
					isAuth: true,
					name: localStorage.getItem('user') || '',
					token: localStorage.getItem('token') || '',
					email: '',
				})
			);
		}
	}, [pathname]);

	function onClickLogout() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
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
