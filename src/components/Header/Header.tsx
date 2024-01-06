import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../common/Button/Button';
import Logo from './components/Logo/Logo';
import { logoutUser } from '../../store/user/actions';
import { getUser } from '../../helpers/selectors';
import './header.css';
import { logutUserFromService } from '../../services';

const Header = () => {
	const userState = useSelector(getUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	function onClickLogout() {
		logutUserFromService();
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
