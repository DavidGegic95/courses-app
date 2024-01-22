import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			navigate('/courses');
		} else {
			navigate('/login');
		}
	}, []);
	return <div className='app'></div>;
}

export default App;
