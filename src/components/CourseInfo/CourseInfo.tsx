import React from 'react';
import { mockedAuthorsList } from '../../constants';

function formatDuration(duration: number): string {
	const hh: number = Math.floor(duration / 60);
	const mm: number = duration % 60;
	return `${format(hh)}:${format(mm)} hours`;
}

function format(num: number): string {
	if (num < 10) {
		return `0${num}`;
	} else {
		return `${num}`;
	}
}

function formatDate(date: string): string {
	return date.replaceAll('/', '.');
}

function selectAuthor(authorID: string): string {
	let authorName = '';
	for (const element of mockedAuthorsList) {
		if (authorID === element.id) {
			authorName = element.name;
		}
	}

	return authorName;
}
type CourseInfoType = {
	IdOfCourse: string;
	title: string;
	description: string;
	duration: number;
	listOfAuthors: string[];
	creationDate: string;
};

const CourseInfo = ({
	IdOfCourse,
	title,
	description,
	duration,
	listOfAuthors,
	creationDate,
}: Partial<CourseInfoType>) => {
	return (
		<div>
			<h2>{title}</h2>
			<section>
				<p>Description: </p>
				<p>{description}</p>
			</section>
			<section>
				<p>
					<span>ID: </span>
					{IdOfCourse}
				</p>
				<p>
					<span>Duration: </span>
					{formatDuration(duration!)}
				</p>
				<p>
					<span>
						Created:
						{formatDate(creationDate!)}
					</span>
				</p>
				<p>
					<span>
						Authors:
						{listOfAuthors!.map((e) => {
							return selectAuthor(e);
						})}
					</span>
				</p>
			</section>
		</div>
	);
};

export default CourseInfo;
