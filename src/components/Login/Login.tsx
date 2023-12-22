import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
type UserRegistration = {
	password: string;
	email: string;
};

const Login = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<UserRegistration>({
		password: '',
		email: '',
	});
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
		setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
	};
	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});

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
					throw new Error(`HTTP error! Status: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => {
				localStorage.setItem('token', data.result);
				localStorage.setItem('user', data.user.name);
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
							className='email'
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
							className='password'
							placeholder='Enter your password'
						/>
						<p style={{ color: 'red' }}>{errors.password}</p>
					</div>
					<button type='submit' className='registration_button'>
						Login
					</button>
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
