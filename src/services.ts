export const getAllCourses = (saveCourses: (data: []) => void) => {
	fetch('http://localhost:4000/courses/all', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((res) => {
			if (!res.ok) {
				throw new Error('Error get courses');
			} else {
				return res.json();
			}
		})
		.then((data) => {
			saveCourses(data);
		})
		.catch((err) => {
			console.log(err);
		});
};
