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
import CreateCourse from './components/CreateCourse/CreateCourse';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/courses' element={<Courses />} />
        <Route
          path='/courses/add'
          element={
            <PrivateRoute>
              <CreateCourse />
            </PrivateRoute>
          }
        />
        <Route
          path='/courses/update/:courseId'
          element={
            <PrivateRoute>
              <CreateCourse />
            </PrivateRoute>
          }
        />

        <Route path='/courses/:courseId' element={<CourseInfo />} />
        <Route path='login' element={<Login />} />
        <Route path='registration' element={<Registration />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
