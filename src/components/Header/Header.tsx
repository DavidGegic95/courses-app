import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import { logoutUser } from '../../store/user/actions';
import { getUser } from '../../helpers/selectors';
import './header.css';
import { logutUserFromService } from '../../services';
import { userThunkAction } from '../../store/user/thunk';
import { coursesThunkFunction } from '../../store/courses/thunk';
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { authorsThunkFunction } from '../../store/authors/thunk';

const Header = () => {
	const userState = useSelector(getUser);
	const dispatch =
		useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();
	const navigate = useNavigate();

	function onClickLogout() {
		logutUserFromService();
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		dispatch(logoutUser());
		navigate('/login');
	}
	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(userThunkAction);
			dispatch(coursesThunkFunction());
			dispatch(authorsThunkFunction());
		} else {
			navigate('/login');
		}
	}, []);
	return (
		<header>
			<Logo />
			{localStorage.getItem('token') && (
				<div className='logout_user_wrapper'>
					<p className='user_name'>
						{userState.name ? userState.name : localStorage.getItem('user')}
					</p>
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
