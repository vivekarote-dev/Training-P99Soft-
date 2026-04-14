package com.p99soft.StudentManagement.repository;


import com.p99soft.StudentManagement.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
