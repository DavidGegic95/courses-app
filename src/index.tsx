import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/components/Courses';
import Header from './components/Header/Header';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
	<BrowserRouter>
		<Header />
		<Routes>
			<Route path='/' element={<App />} />
			<Route path='/courses' element={<Courses />} />
			<Route path='/courses/:courseId' element={<CourseInfo />} />
			<Route path='login' element={<Login />} />
			<Route path='registration' element={<Registration />} />
		</Routes>
	</BrowserRouter>
);
