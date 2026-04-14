package com.P99.BasicCurd;

import com.P99.BasicCurd.entity.Student;
import com.P99.BasicCurd.repository.StudentRepository;
import com.P99.BasicCurd.service.StudentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class StudentCrudTests {

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentRepository studentRepository;

    @BeforeEach
    public void setUp() {
        studentRepository.deleteAll();
    }

    @Test
    public void testCreateStudent() {
        Student student = new Student(null, "John Doe", "john@example.com", 3.8, "CS");
        Student created = studentService.createStudent(student);

        assertNotNull(created.getId());
        assertEquals("John Doe", created.getName());
        assertEquals("john@example.com", created.getEmail());
    }

    @Test
    public void testGetAllStudents() {
        Student student1 = new Student(null, "Alice Smith", "alice@example.com", 3.9, "IT");
        Student student2 = new Student(null, "Bob Wilson", "bob@example.com", 3.7, "ECE");
        studentRepository.save(student1);
        studentRepository.save(student2);

        var students = studentService.getAllStudents();
        assertEquals(2, students.size());
    }

    @Test
    public void testGetStudentById() {
        Student student = new Student(null, "Bob Wilson", "bob@example.com", 3.7, "ECE");
        Student saved = studentRepository.save(student);

        var retrieved = studentService.getStudentById(saved.getId());
        assertTrue(retrieved.isPresent());
        assertEquals("Bob Wilson", retrieved.get().getName());
    }

    @Test
    public void testUpdateStudent() {
        Student student = new Student(null, "Eve Johnson", "eve@example.com", 3.5, "ME");
        Student saved = studentRepository.save(student);

        Student updatedDetails = new Student(null, "Eve Updated", "eve.updated@example.com", 3.6, "ME");
        Student updated = studentService.updateStudent(saved.getId(), updatedDetails);

        assertNotNull(updated);
        assertEquals("Eve Updated", updated.getName());
        assertEquals("eve.updated@example.com", updated.getEmail());
        assertEquals(3.6, updated.getGpa());
    }

    @Test
    public void testDeleteStudent() {
        Student student = new Student(null, "Charlie Brown", "charlie@example.com", 3.2, "Civil");
        Student saved = studentRepository.save(student);

        studentService.deleteStudent(saved.getId());
        var retrieved = studentService.getStudentById(saved.getId());

        assertTrue(retrieved.isEmpty());
    }

    @Test
    public void testSearchByDepartment() {
        Student student1 = new Student(null, "Alice", "alice@example.com", 3.9, "IT");
        Student student2 = new Student(null, "Bob", "bob@example.com", 3.7, "IT");
        Student student3 = new Student(null, "Charlie", "charlie@example.com", 3.2, "Civil");
        studentRepository.saveAll(java.util.Arrays.asList(student1, student2, student3));

        var itStudents = studentService.getStudentsByDepartment("IT");
        assertEquals(2, itStudents.size());
    }

    @Test
    public void testSearchByName() {
        Student student1 = new Student(null, "John Doe", "john@example.com", 3.8, "CS");
        Student student2 = new Student(null, "Jane Doe", "jane@example.com", 3.9, "IT");
        studentRepository.saveAll(java.util.Arrays.asList(student1, student2));

        var doeStudents = studentService.searchStudentsByName("Doe");
        assertEquals(2, doeStudents.size());
    }
}
