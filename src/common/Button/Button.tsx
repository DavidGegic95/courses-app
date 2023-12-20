import React from 'react';
type CourseInfoType = {
	IdOfCourse: string;
	title: string;
	description: string;
	duration: number;
	listOfAuthors: string[];
	creationDate: string;
};

const Button = ({
	buttonText,
	name,
	setCourseInfoState,
	courseInfo,
	courseInfoState,
}: {
	buttonText: string;
	name?: string;
	setCourseInfoState?: (e: CourseInfoType | null) => void;
	courseInfo?: CourseInfoType;
	courseInfoState?: CourseInfoType;
}) => {
	function onClickSetCourse() {
		if (courseInfoState && buttonText === 'BACK') {
			setCourseInfoState!(null);
		} else if (courseInfo) {
			setCourseInfoState!(courseInfo);
		}
	}
	return (
		<button onClick={onClickSetCourse} className={name}>
			{buttonText}
		</button>
	);
};

export default Button;
