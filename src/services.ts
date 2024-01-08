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
			throw new Error(`Failed to fetch courses. Status: ${response.status}`);
		}

		const data = await response.json();
		return data.result;
	} catch (error) {
		console.error('Error fetching courses:');
		throw error;
	}
};
