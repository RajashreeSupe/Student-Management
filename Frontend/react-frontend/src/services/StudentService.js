import axios from 'axios';

// Make sure this matches your Spring Boot backend URL and port
const STUDENT_API_BASE_URL = "http://localhost:8070/api/v1/students";

class StudentService {

    // Get all students
    getStudents(){
        return axios.get(STUDENT_API_BASE_URL);
    }

    // Create a new student
    createStudent(student){
        return axios.post(STUDENT_API_BASE_URL, student);
    }

    // Get student by ID
    getStudentById(studentId){
        return axios.get(`${STUDENT_API_BASE_URL}/${studentId}`);
    }

    // Update student by ID
    updateStudent(student, studentId){
        return axios.put(`${STUDENT_API_BASE_URL}/${studentId}`, student);
    }

    // Delete student by ID
    deleteStudent(studentId){
        return axios.delete(`${STUDENT_API_BASE_URL}/${studentId}`);
    }
}

export default new StudentService();
