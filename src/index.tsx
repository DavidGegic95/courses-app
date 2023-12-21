import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<App />} />
			<Route path='login' element={<Login />} />
			<Route path='registration' element={<Registration />} />
		</Routes>
	</BrowserRouter>
);
