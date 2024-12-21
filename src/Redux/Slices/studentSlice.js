import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStudents, addStudent, updateStudent, deleteStudent } from '../../Api'; 

export const fetchStudentsAsync = createAsyncThunk(
    'students/fetchStudents',
    async () => {
        try {
            const response = await fetchStudents();
            return response;
        } catch (error) {
            console.error('Error fetching students:', error);
            throw error;
        }
    }
);

// Add a new student
export const createStudentAsync = createAsyncThunk(
    'students/createStudent',
    async (studentData, { rejectWithValue }) => {
        try {
            const response = await addStudent(studentData); 
            return response;
        } catch (error) {
            console.error('Error adding student:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Update an existing student
export const updateStudentAsync = createAsyncThunk(
    'students/updateStudent',
    async (studentData, { rejectWithValue }) => {
        try {
            const response = await updateStudent(studentData.id, studentData); 
            return response;
        } catch (error) {
            console.error('Error updating student:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Delete student
export const deleteStudentAsync = createAsyncThunk(
    'students/deleteStudent', 
    async (id, { rejectWithValue }) => {
        try {
            await deleteStudent(id); 
            return id; 
        } catch (error) {
            console.error('Error deleting student:', error);
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const studentsSlice = createSlice({
    name: 'students',
    initialState: {
        students: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch students
            .addCase(fetchStudentsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchStudentsAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.students = action.payload;
            })
            .addCase(fetchStudentsAsync.rejected, (state) => {
                state.status = 'failed';
            })

            // Add a new student
            .addCase(createStudentAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createStudentAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.students.push(action.payload); 
            })
            .addCase(createStudentAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Update student
            .addCase(updateStudentAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateStudentAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.students.findIndex(student => student.id === action.payload.id);
                if (index !== -1) {
                    state.students[index] = action.payload; 
                }
            })
            .addCase(updateStudentAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Delete student
            .addCase(deleteStudentAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteStudentAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.students = state.students.filter(student => student.id !== action.payload); 
            })
            .addCase(deleteStudentAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default studentsSlice.reducer;
