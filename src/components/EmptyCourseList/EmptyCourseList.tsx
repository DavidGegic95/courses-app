import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button/Button';
import './emptyCourseList.css';

const EmptyCourseList = () => {
	const navigate = useNavigate();
	return (
		<div className='emptyCourseList_component'>
			<h2 className='title_emptyCourseList'>Your List is Empty</h2>
			<p className='subtitle_emptyCourseList'>
				Please use "Add New Course" button to add your first course
			</p>
			<Button
				onClick={() => navigate('/courses/add')}
				name='add_button_empty_course_list'
				buttonText='Add New Course'
			/>
		</div>
	);
};

export default EmptyCourseList;
