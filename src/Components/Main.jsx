import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import { format } from 'date-fns';
import {
    fetchStudentsAsync,
    createStudentAsync,
    updateStudentAsync,
    deleteStudentAsync
} from "../Redux/Slices/studentSlice";
import { useDispatch, useSelector } from "react-redux";

const Main = () => {
    const [cohortFilter, setCohortFilter] = useState('choose cohort');
    const [courseFilter, setCourseFilter] = useState('choose course');
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [selectedCohort, setSelectedCohort] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [newStudent, setNewStudent] = useState({ name: "", cohort: "", courses: [] });

    const dispatch = useDispatch();
    const { students, status } = useSelector((state) => state.students);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchStudentsAsync());
        }
    }, [dispatch, status]);

    const handlePopupClose = () => {
        setIsPopupVisible(false);
        setIsEditPopupVisible(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!newStudent.name || !selectedCohort || selectedCourses.length === 0) {
            alert("Please fill up all fields!");
            return;
        }
        const studentExists = students.some((student) => student.name.toLowerCase() === newStudent.name.toLowerCase());
    if (studentExists) {
        alert("Student already exists!");
        return; 
    }
        const student = {
            name: newStudent.name,
            cohort: selectedCohort,
            courses: selectedCourses.join(", "),
        };

        dispatch(createStudentAsync(student));
        alert("Student added successfully!");

        setNewStudent({ name: "" });
        setSelectedCohort("");
        setSelectedCourses([]);
        handlePopupClose();
    };


    const handleStudentClick = (student) => {
        setSelectedStudent(student);
        setSelectedCourses(student.courses ? student.courses.split(", ") : []);
        setIsEditPopupVisible(true);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        if (!selectedStudent.name || !selectedStudent.cohort || selectedCourses.length === 0) {
            alert("Please fill all fields correctly!");
            return;
        }
        const updatedStudent = {
            ...selectedStudent,
            courses: selectedCourses.join(", "),
        };
        dispatch(updateStudentAsync(updatedStudent));
        alert("Student updated successfully!");
        handlePopupClose();
    };

    const handleDelete = () => {
        dispatch(deleteStudentAsync(selectedStudent.id));
        alert("Student deleted successfully!");
        handlePopupClose();
    };

    const handleCourseToggle = (course) => {
        setSelectedCourses((prevCourses) =>
            prevCourses.includes(course)
                ? prevCourses.filter((c) => c !== course)
                : prevCourses.length < 2
                    ? [...prevCourses, course]
                    : prevCourses
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewStudent((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdateInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setSelectedCourses((prevCourses) =>
                checked
                    ? [...prevCourses, value]
                    : prevCourses.filter((course) => course !== value)
            );
        } else {
            setSelectedStudent((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const courses = ["CBSE 9 Science", "CBSE 9 Math", "CBSE 10 Science", "CBSE 10 Math"];
    const cohorts = ['choose cohort', 'AY 2024-25', 'AY 2023-24', 'AY 2022-23', 'AY 2021-22'];

    const filteredStudents = students.filter((student) =>
        (cohortFilter === 'choose cohort' || student.cohort === cohortFilter) &&
        (courseFilter === 'choose course' || student.courses?.includes(courseFilter))
    );

    return (
        <main className="flex-1 px-2 md:px-6 max-w-full text-sm md:ml-56 bg-gray-100">
            <div className="flex justify-between flex-col-reverse items-baseline gap-5 lg:flex-row-reverse bg-white pt-4 pb-8 pl-1 md:px-5 rounded-t-lg">
                <button
                    onClick={() => setIsPopupVisible(true)}
                    className="flex items-center justify-center gap-2 px-4 py-1 text-gray-600 font-semibold bg-gray-200 rounded-md hover:bg-blue-600 hover:text-white"
                >
                    <span className="text-2xl font-normal">+</span> Add New Student
                </button>
                <div className="flex space-x-4 text-gray-600 font-semibold">
                    <select
                        className="px-1 md:px-3  py-1 border rounded-md bg-gray-200 cursor-pointer"
                        onChange={(e) => setCohortFilter(e.target.value)}
                    >
                        {cohorts.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                    <select
                        className="px-1 md:px-3 py-1 border rounded-md bg-gray-200 cursor-pointer"
                        onChange={(e) => setCourseFilter(e.target.value)}
                    >
                        {["choose course", ...courses].map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto bg-white shadow-lg rounded-b-lg px-4 py-2">
                <table className="min-w-max w-full table-auto bg-white text-sm">
                    <thead>
                        <tr className="text-black border-b border-gray-300">
                            {["Student Name", "Cohort", "Courses", "Date Joined", "Last Login", "Status"].map((header) => (
                                <th
                                    key={header}
                                    className={`px-4 py-3 text-left font-bold ${header === "Last Login" || header === "Status" ? "text-center" : ""
                                        }`}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map((student) => (
                            <tr
                                key={student.id}
                                onClick={() => handleStudentClick(student)}
                                className="border-b border-gray-300 hover:bg-gray-50 cursor-pointer"
                            >
                                <td className="px-4 py-3 truncate">{student.name}</td>
                                <td className="px-4 py-3 truncate">{student.cohort}</td>
                                <td className="px-4 py-3">
                                    {student.courses.split(",").map((course, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-gray-100 rounded-md text-sm px-2 py-1 mx-1 block md:inline"
                                        >
                                            {course}
                                        </span>
                                    ))}
                                </td>
                                <td className="px-4 py-3">{format(new Date(student.date_joined), "dd.MMM.yyyy")}</td>
                                <td className="px-4 py-3 text-center">
                                    {format(new Date(student.last_login), "dd.MMM.yyyy hh:mm a")}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className={`w-3 h-3 rounded-full inline-block ${student.status ? "bg-green-500" : "bg-red-500"
                                            }`}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Popup isOpen={isPopupVisible} onClose={handlePopupClose}>
                <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
                <form onSubmit={handleFormSubmit}>
                    <label className="block text-gray-700 mb-2">
                        Student Name
                        <input
                            type="text"
                            name="name"
                            value={newStudent.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Enter student name"
                            required
                        />
                    </label>
                    <label className="block text-gray-700 mb-2">
                        Cohort
                        <select
                            name="cohort"
                            value={selectedCohort}
                            onChange={(e) => setSelectedCohort(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        >
                            {cohorts.map((cohort, idx) => (
                                <option key={idx} value={cohort}>{cohort}</option>
                            ))}
                        </select>
                    </label>
                    <label className="block text-gray-700 mb-4">
                        Course (Select up to 2)
                        <div>
                            {courses.map((course) => (
                                <label key={course} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={course}
                                        onChange={() => handleCourseToggle(course)}
                                    />
                                    <span className="ml-2">{course}</span>
                                </label>
                            ))}
                        </div>
                    </label>
                    <div className="flex justify-end space-x-4">
                        <button type="button" className="px-4 py-2 bg-gray-300 rounded-md" onClick={handlePopupClose}>Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
                    </div>
                </form>
            </Popup>

            <Popup isOpen={isEditPopupVisible} onClose={handlePopupClose}>
                <h2 className="text-xl font-semibold mb-4">Edit Student Details</h2>
                <form onSubmit={handleEdit}>
                    <label className="block text-gray-700 mb-2">
                        Student Name
                        <input
                            type="text"
                            name="name"
                            value={selectedStudent?.name || ""}
                            onChange={handleUpdateInputChange}
                            className="w-full px-4 py-2 border rounded-md"
                            placeholder="Enter student name"
                            required
                        />
                    </label>
                    <label className="block text-gray-700 mb-2">
                        Cohort
                        <select
                            name="cohort"
                            value={selectedStudent?.cohort || ""}
                            onChange={handleUpdateInputChange}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        >
                            {cohorts.map((cohort, idx) => (
                                <option key={idx} value={cohort}>{cohort}</option>
                            ))}
                        </select>
                    </label>
                    <label className="block text-gray-700 mb-2">
                        Status
                        <div className="flex items-center mt-2">
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    name="status"
                                    value="true"
                                    checked={selectedStudent?.status === true}
                                    onChange={(e) => setSelectedStudent((prev) => ({ ...prev, status: e.target.value === "true" }))}
                                    className="mr-2"
                                />
                                Active
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="status"
                                    value="false"
                                    checked={selectedStudent?.status === false}
                                    onChange={(e) => setSelectedStudent((prev) => ({ ...prev, status: e.target.value === "true" }))}
                                    className="mr-2"
                                />
                                Inactive
                            </label>
                        </div>
                    </label>
                    <label className="block text-gray-700 mb-4">
                        Course (Select up to 2)
                        <div>
                            {courses.map((course) => (
                                <label key={course} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={course}
                                        checked={selectedCourses.includes(course)}
                                        onChange={() => handleCourseToggle(course)}
                                    />
                                    <span className="ml-2">{course}</span>
                                </label>
                            ))}
                        </div>
                    </label>
                    <div className="flex justify-end space-x-4">
                        <button type="button" className="px-4 py-2 bg-gray-300 rounded-md" onClick={handlePopupClose}>Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">Save</button>
                        <button type="button" onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
                    </div>
                </form>
            </Popup>
        </main>
    );
};

export default Main;
