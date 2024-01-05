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

type requestBody = {
	title: string;
	description: string;
	duration: number;
	authors: string[];
};
export const createCourseApiRequest = async (requestBody: requestBody) => {
	try {
		const baererToken = await getAdminToken();

		const requestBodyCopy = {
			...requestBody,
			authors: [...requestBody.authors],
			duration: Number(requestBody.duration),
		};
		const response = await fetch('http://localhost:4000/courses/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: baererToken,
			},
			body: JSON.stringify(requestBodyCopy),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				`Request failed with status ${response.status}: ${errorData.message}`
			);
		}

		const responseData = await response.json();
		return responseData;
	} catch (error) {
		console.error('Error:failed to fetch');
		throw error;
	}
};

async function getAdminToken() {
	const adminCredential = {
		email: 'admin@email.com',
		password: 'admin123',
	};
	try {
		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(adminCredential),
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

export async function addAuthorToDatabase(authorName: string) {
	const requestBody = { name: authorName };
	try {
		const baererToken = await getAdminToken();

		const response = await fetch('http://localhost:4000/authors/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: baererToken,
			},
			body: JSON.stringify(requestBody),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				`Request failed with status ${response.status}: ${errorData.message}`
			);
		}

		const responseData = await response.json();
		return responseData.result.id;
	} catch (error) {
		console.error('Error:failed to fetch');
		throw error;
	}
}
