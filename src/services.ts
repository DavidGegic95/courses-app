import { CourseType } from './store/courses/types';

export const fetchCoursesFromService = async () => {
	try {
		const response = await fetch('http://localhost:4000/courses/all', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch courses. Status: ${response.status}`);
		}

		const data = await response.json();
		return data.result;
	} catch (error) {
		console.error('Error fetching courses:');
		throw error;
	}
};

export const fetchAuthorsFromService = async () => {
	try {
		const response = await fetch('http://localhost:4000/authors/all', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch authors. Status: ${response.status}`);
		}

		const data = await response.json();
		return data.result;
	} catch (error) {
		console.error('Error fetching authors.');
		throw error;
	}
};

export const fetchUserFromService = async () => {
	try {
		const response = await fetch('http://localhost:4000/users/me', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${localStorage.getItem('token')}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch user info. Status: ${response.status}`);
		}

		const data = await response.json();
		return data.result;
	} catch (error) {
		console.error('Error fetching user info');
		throw error;
	}
};

export const logutUserFromService = async () => {
	try {
		const response = await fetch('http://localhost:4000/logout', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${localStorage.getItem('token')}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to logut user. Status: ${response.status}`);
		}
	} catch (error) {
		console.error('Error logout user.');
		throw error;
	}
};

export const deleteCourseFromService = async (courseId: string) => {
	try {
		const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${localStorage.getItem('token')}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to delete course. Status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error deliting course.');
		throw error;
	}
};

export async function addCourseToBackendFromServices(requestBody: CourseType) {
	requestBody = {
		...requestBody,
		duration: Number(requestBody.duration),
	};
	try {
		const response = await fetch('http://localhost:4000/courses/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(requestBody),
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch courses. Status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching courses:');
		throw error;
	}
}

export async function addAuthorToBackendFromServices(author: { name: string }) {
	try {
		const response = await fetch('http://localhost:4000/authors/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(author),
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch courses. Status: ${response.status}`);
		}

		const data = await response.json();
		return data.result;
	} catch (error) {
		console.error('Error fetching courses:');
		throw error;
	}
}
