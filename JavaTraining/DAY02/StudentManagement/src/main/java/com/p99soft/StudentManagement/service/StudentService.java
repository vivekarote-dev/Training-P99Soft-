package com.p99soft.StudentManagement.service;

import com.p99soft.StudentManagement.dto.StudentDto;
import com.p99soft.StudentManagement.entity.Student;
import java.util.List;

public interface StudentService {
    Student createStudent(Student student);
    Student getStudentById(Long id);
    List<Student> getAllStudents();
    Student updateStudent(Long id, Student student);
    void deleteStudent(Long id);

    StudentDto saveUsingDto(StudentDto studentDto);
}
