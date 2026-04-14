package com.p99soft.StudentManagement.controller;

import com.p99soft.StudentManagement.dto.StudentDto;
import com.p99soft.StudentManagement.entity.Student;
import com.p99soft.StudentManagement.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/create")
    public StudentDto createStudent(@RequestBody StudentDto studentDto){
        Student student = new Student(studentDto.getName(), studentDto.getEmail(), studentDto.getCourse());
        Student savedStudent = studentService.createStudent(student);
        return convertToDto(savedStudent);
    }

    @GetMapping("/get")
    public Object getStudents(@RequestParam(required = false) Long id){
        if (id != null) {
            Student student = studentService.getStudentById(id);
            return student != null ? convertToDto(student) : null;
        } else {
            List<Student> students = studentService.getAllStudents();
            return students.stream().map(this::convertToDto).toList();
        }
    }

    @PutMapping("/update/{id}")
    public StudentDto updateStudent(@PathVariable Long id, @RequestBody StudentDto studentDto){
        Student student = new Student(studentDto.getName(), studentDto.getEmail(), studentDto.getCourse());
        Student updatedStudent = studentService.updateStudent(id, student);
        return updatedStudent != null ? convertToDto(updatedStudent) : null;
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable Long id){
        studentService.deleteStudent(id);
    }

    private StudentDto convertToDto(Student student) {
        return new StudentDto(student.getId(), student.getName(), student.getEmail(), student.getCourse());
    }

}
