package com.example.StudentManagementProject.exception;

public class StudentNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    // Default constructor
    public StudentNotFoundException() {
        super("Student not found");
    }

    // Constructor with custom message
    public StudentNotFoundException(String message) {
        super(message);
    }
}
