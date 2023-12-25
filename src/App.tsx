import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './App.css';

function App() {
	const navigate = useNavigate();
	const location = useLocation();
	const { pathname } = location;
	useEffect(() => {
		if (localStorage.getItem('token') && navigate) {
			navigate('/courses');
		} else {
			navigate('/login');
		}
	}, [pathname]);
	return <div className='app'></div>;
}

export default App;
