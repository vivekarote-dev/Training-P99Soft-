package com.p99soft.StudentManagement.service.impl;

import com.p99soft.StudentManagement.dto.StudentDto;
import com.p99soft.StudentManagement.entity.Student;
import com.p99soft.StudentManagement.repository.StudentRepository;
import com.p99soft.StudentManagement.service.StudentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class StudentServiceimpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Student createStudent(Student student) {
        student.setId(null); // Ensure it's a new entity
        return studentRepository.save(student);
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student updateStudent(Long id, Student student) {
        if (studentRepository.existsById(id)) {
            student.setId(id);
            return studentRepository.save(student);
        }
        return null;
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
    @Override
    public StudentDto saveUsingDto(StudentDto studentDto) {
        Student student = new Student(studentDto.getName(), studentDto.getEmail(), studentDto.getCourse());
        Student savedStudent = createStudent(student);
        return new StudentDto(savedStudent.getId(), savedStudent.getName(), savedStudent.getEmail(), savedStudent.getCourse());
    }
}
