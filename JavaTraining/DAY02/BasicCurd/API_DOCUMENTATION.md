# Spring Boot Basic CRUD Application

This is a basic CRUD (Create, Read, Update, Delete) operation project built with Spring Boot. It manages Student records with a simple REST API.

## Features

- **Create**: Add new student records
- **Read**: Retrieve all students, search by ID, department, or name
- **Update**: Modify existing student records
- **Delete**: Remove student records
- **Database**: H2 in-memory database for easy testing
- **REST API**: Full REST API for all operations

## Project Structure

```
src/main/java/com/P99/BasicCurd/
├── entity/
│   └── Student.java           # Entity class for Student
├── repository/
│   └── StudentRepository.java  # JPA Repository for database operations
├── service/
│   └── StudentService.java     # Business logic layer
├── controller/
│   └── StudentController.java  # REST API endpoints
└── BasicCurdApplication.java   # Main Spring Boot application
```

## Running the Application

### Prerequisites
- Java 21+
- Gradle

### Build and Run

```bash
# Build the project
./gradlew.bat build -x test

# Run the application
./gradlew.bat bootRun
```

The application will start on `http://localhost:8080`

## API Endpoints

### 1. Create a Student
**POST** `/api/students`

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "gpa": 3.8,
  "department": "Computer Science"
}
```

### 2. Get All Students
**GET** `/api/students`

### 3. Get Student by ID
**GET** `/api/students/{id}`

### 4. Get Students by Department
**GET** `/api/students/department/{department}`

### 5. Search Students by Name
**GET** `/api/students/search?name=John`

### 6. Update Student
**PUT** `/api/students/{id}`

Request Body:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "gpa": 3.9,
  "department": "Computer Science"
}
```

### 7. Delete Student by ID
**DELETE** `/api/students/{id}`

### 8. Delete All Students
**DELETE** `/api/students`

## Database

The application uses H2 in-memory database which is automatically initialized on startup.

### H2 Console
Access the H2 console at: `http://localhost:8080/h2-console`

Connection details:
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: (leave empty)

## Testing with cURL or Postman

### Create a student
```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","gpa":3.8,"department":"Computer Science"}'
```

### Get all students
```bash
curl http://localhost:8080/api/students
```

### Get student by ID
```bash
curl http://localhost:8080/api/students/1
```

### Update student
```bash
curl -X PUT http://localhost:8080/api/students/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","gpa":3.9,"department":"Computer Science"}'
```

### Delete student
```bash
curl -X DELETE http://localhost:8080/api/students/1
```

## Technologies Used

- Spring Boot 4.0.5
- Spring Data JPA
- Spring Web MVC
- H2 Database
- Lombok (for reducing boilerplate code)
- Gradle (Build tool)
- Java 21

## Student Entity Fields

- **id**: Unique identifier (auto-generated)
- **name**: Student's full name (required)
- **email**: Student's email address (required)
- **gpa**: Student's GPA (required)
- **department**: Student's department (required)

## Dependencies

All dependencies are defined in `build.gradle`:
- Spring Boot Starters (Data JPA, Web)
- H2 Database
- Lombok
- Spring Boot Test (for testing)

## Notes

- The database is in-memory and will be reset when the application restarts
- For production use, replace H2 with a persistent database like PostgreSQL or MySQL
- CORS is enabled to allow requests from any origin

---

Happy Coding! 🚀

