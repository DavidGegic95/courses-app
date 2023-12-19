import React from 'react';
import Button from '../../common/Button/Button';
import './emptyCourseList.css';

const EmptyCourseList = () => {
	return (
		<div className='emptyCourseList_component'>
			<h2 className='title_emptyCourseList'>Your List is Empty</h2>
			<p className='subtitle_emptyCourseList'>
				Please use "Add New Course" button to add your first course
			</p>
			<Button name='add_button_empty_course_list' buttonText='Add New Course' />
		</div>
	);
};

export default EmptyCourseList;
