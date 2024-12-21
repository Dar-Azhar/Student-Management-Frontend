import axios from "axios";

const BASE_API_URL = "http://localhost:3000/api/student";

export const fetchStudents = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/get-all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/create`, studentData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
    throw new Error(error.response?.data?.message || 'Failed to add student');
  }
};

export const updateStudent = async (id, updatedData) => {
  try {
    const response = await axios.put(`${BASE_API_URL}/update/${id}`, updatedData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw new Error(error.response?.data?.message || 'Failed to update student');
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${BASE_API_URL}/delete/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete student');
  }
};
