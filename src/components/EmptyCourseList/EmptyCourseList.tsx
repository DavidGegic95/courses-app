import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { getUser } from '../../helpers/selectors';
import './emptyCourseList.css';

const EmptyCourseList = () => {
	const navigate = useNavigate();
	const userState = useSelector(getUser);
	const [userPermission, setUserPermission] = useState('');
	const onClickAddNewCourse = () => {
		if (userState.role === 'admin') {
			navigate('/courses/add');
		} else
			setUserPermission(
				"You don't have permissions to create a course. Please log in as ADMIN."
			);
	};
	return (
		<div className='emptyCourseList_component'>
			<h2 className='title_emptyCourseList'>Your List is Empty</h2>
			<p className='subtitle_emptyCourseList'>
				Please use "Add New Course" button to add your first course
			</p>
			<Button
				onClick={onClickAddNewCourse}
				name='add_button_empty_course_list'
				buttonText='Add New Course'
			/>
			{userPermission && <p className='error_text'>{userPermission}</p>}
		</div>
	);
};

export default EmptyCourseList;
