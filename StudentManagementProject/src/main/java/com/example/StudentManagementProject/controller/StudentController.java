package com.example.StudentManagementProject.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.StudentManagementProject.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.StudentManagementProject.exception.StudentNotFoundException;
import com.example.StudentManagementProject.model.Student;

@CrossOrigin(origins = "http://localhost:3000")
//Automatically converts Java objects (like Student) to JSON in HTTP response.
//You don’t need to write @ResponseBody on every method.
@RestController
@RequestMapping("/api/v1/")
public class StudentController {

//Injects the repository instance automatically.
//Why: So we can access database methods like findAll(), save(), etc.
    @Autowired
    private StudentRepository studentRepository;

    // get all students
    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // create Student rest api
    @PostMapping("/students")
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }

    // get student by id rest api
    @GetMapping("/students/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not exist with id :" + id));
        return ResponseEntity.ok(student);
    }

    // update student rest api
    @PutMapping("/students/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not exist with id :" + id));

        student.setFirstName(studentDetails.getFirstName());
        student.setLastName(studentDetails.getLastName());
        student.setEmailId(studentDetails.getEmailId());
        student.setCourse(studentDetails.getCourse()); // 

        Student updatedStudent = studentRepository.save(student);
        return ResponseEntity.ok(updatedStudent);
    }

    // delete student rest api
    @DeleteMapping("/students/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteStudent(@PathVariable Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not exist with id :" + id));

        studentRepository.delete(student);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
