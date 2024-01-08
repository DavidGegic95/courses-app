import React, { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import './registration.css';

type UserRegistration = {
	name: string;
	password: string;
	email: string;
};

const Registration = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<UserRegistration>({
		name: '',
		password: '',
		email: '',
	});
	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		let validation = true;

		if (!formData.name.trim()) {
			setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
			validation = false;
		}

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

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
		setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
	};

	function fetchData(): void {
		fetch('http://localhost:4000/register', {
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
			.then(() => navigate('/login'))
			.catch((error) => {
				console.error('Error:', error.message);
			});
	}

	return (
		<div className='registration_page'>
			<h2 className='title_registration_page'>Registration</h2>
			<div className='registration_card'>
				<form
					onSubmit={(e) => handleSubmit(e)}
					className='registration_form'
					action=''
				>
					<div className='input-wrapper__registration'>
						<label className='label__registration' htmlFor='name'>
							Name
						</label>
						<input
							type='text'
							name='name'
							id='name'
							value={formData.name}
							onChange={handleInputChange}
							className={`name ${errors.name ? 'error' : ''}`}
							placeholder='Enter your name'
						/>
						<p style={{ color: 'red' }}>{errors.name}</p>
					</div>
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
							className={`password ${errors.password ? 'error' : ''}`}
							placeholder='Enter your password'
						/>
						<p style={{ color: 'red' }}>{errors.password}</p>
					</div>
					<Button
						type='submit'
						name='registration_button'
						buttonText='Register'
					/>
				</form>

				<div className='link_wrapper'>
					<p className='link_p'>If you have an account you may </p>{' '}
					<Link className='login_link' to={'/login'}>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Registration;
