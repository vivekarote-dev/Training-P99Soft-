package com.P99.BasicCurd;

import com.P99.BasicCurd.entity.Student;
import com.P99.BasicCurd.repository.StudentRepository;
import com.P99.BasicCurd.service.StudentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class StudentCrudTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentRepository studentRepository;

    @BeforeEach
    public void setUp() {
        studentRepository.deleteAll();
    }

    @Test
    public void testCreateStudent() throws Exception {
        String json = "{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"gpa\":3.8,\"department\":\"CS\"}";

        mockMvc.perform(MockMvcRequestBuilders.post("/api/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("John Doe"));
    }

    @Test
    public void testGetAllStudents() throws Exception {
        Student student = new Student(null, "Alice Smith", "alice@example.com", 3.9, "IT");
        studentRepository.save(student);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/students"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)));
    }

    @Test
    public void testGetStudentById() throws Exception {
        Student student = new Student(null, "Bob Wilson", "bob@example.com", 3.7, "ECE");
        Student saved = studentRepository.save(student);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/students/" + saved.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Bob Wilson"));
    }

    @Test
    public void testUpdateStudent() throws Exception {
        Student student = new Student(null, "Eve Johnson", "eve@example.com", 3.5, "ME");
        Student saved = studentRepository.save(student);

        String updatedJson = "{\"name\":\"Eve Updated\",\"email\":\"eve.updated@example.com\",\"gpa\":3.6,\"department\":\"ME\"}";

        mockMvc.perform(MockMvcRequestBuilders.put("/api/students/" + saved.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(updatedJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Eve Updated"));
    }

    @Test
    public void testDeleteStudent() throws Exception {
        Student student = new Student(null, "Charlie Brown", "charlie@example.com", 3.2, "Civil");
        Student saved = studentRepository.save(student);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/students/" + saved.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/students/" + saved.getId()))
                .andExpect(status().isNotFound());
    }
}

