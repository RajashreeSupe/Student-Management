package com.example.StudentManagementProject.repository;

import com.example.StudentManagementProject.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {
}



