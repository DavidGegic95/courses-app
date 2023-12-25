import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
	name: 'courses',
	initialState: [],
	reducers: {
		setCourses: (state, action) => {
			state = action.payload;
		},
		// deleteCourse: (state, action) => {
		// 	// Handle logic for deleting a course
		// },
		// updateCourse: (state, action) => {
		// 	// Handle logic for updating a course
		// },
		// setCourses: (state, action) => {
		// 	// Handle logic for setting courses from API
		// },
	},
});

export const { setCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
