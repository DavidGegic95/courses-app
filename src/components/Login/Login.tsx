import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { useDispatch } from 'react-redux';
import './login.css';
import { loginUser } from '../../store/user/actions';
type UserRegistration = {
	password: string;
	email: string;
};

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState<UserRegistration>({
		password: '',
		email: '',
	});
	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
		setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let validation = true;

		if (!formData.email.trim()) {
			setErrors((prevErrors) => ({
				...prevErrors,
				email: 'Email is required',
			}));
			validation = false;
		}

		if (!formData.password.trim()) {
			setErrors((prevErrors) => ({
				...prevErrors,
				password: 'Password is required',
			}));
			validation = false;
		}
		if (validation) {
			fetchData();
		}
	};

	function fetchData(): void {
		fetch('http://localhost:4000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((res) => {
				if (!res.ok) {
					setErrors({
						email: 'Invalid username or password',
						password: 'Invalid username or password',
					});
					throw new Error('Invalid username or password');
				}
				return res.json();
			})
			.then((data) => {
				localStorage.setItem('token', data.result);
				localStorage.setItem('user', data.user.name);
				dispatch(
					loginUser({
						isAuth: true,
						name: data.user.name,
						email: data.user.email,
						token: data.result,
						role: data.result.role,
					})
				);
				navigate('/courses');
			})
			.catch((error) => {
				console.error('Error:', error.message);
			});
	}
	return (
		<div className='login_page'>
			<h2 className='title_login_page'>Login</h2>
			<div className='login_card'>
				<form onSubmit={(e) => handleSubmit(e)} className='login_form'>
					<div className='input-wrapper__registration'>
						<label className='label__registration' htmlFor='email'>
							Email
						</label>
						<input
							type='email'
							name='email'
							id='email'
							value={formData.email}
							onChange={handleInputChange}
							className={`email ${errors.email ? 'error' : ''}`}
							placeholder='Enter your email'
						/>
						<p style={{ color: 'red' }}>{errors.email}</p>
					</div>
					<div className='input-wrapper__registration'>
						<label className='label__registration' htmlFor='password'>
							Password
						</label>
						<input
							type='password'
							name='password'
							id='password'
							value={formData.password}
							onChange={handleInputChange}
							className={`password  ${errors.password ? 'error' : ''}`}
							placeholder='Enter your password'
						/>
						<p style={{ color: 'red' }}>{errors.password}</p>
					</div>
					<Button type='submit' name='registration_button' buttonText='Login' />
				</form>

				<div className='link_wrapper' id='login_wrapper'>
					<p className='link_p'>If you don't have an account you may </p>{' '}
					<Link className='login_link' to={'/registration'}>
						Registration
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
