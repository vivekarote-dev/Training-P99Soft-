# Student Management API Documentation

This document describes the REST API endpoints for the Student Management system built with Spring Boot.

## Base URL
```
http://localhost:8080/v1/api/students
```

## Endpoints

### 1. Create Student
- **Method**: `POST`
- **Endpoint**: `/create`
- **Description**: Creates a new student.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "course": "Computer Science"
  }
  ```
- **Response**:
  - **Status**: `200 OK`
  - **Body**: The created student object with generated ID.
  ```json
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "course": "Computer Science"
  }
  ```

### 2. Get Student by ID
- **Method**: `GET`
- **Endpoint**: `/get?id={id}`
- **Description**: Retrieves a student by their ID.
- **Query Parameters**:
  - `id` (Long): The student's ID.
- **Response**:
  - **Status**: `200 OK` (if found)
  - **Body**: The student object.
  - **Status**: `200 OK` with `null` if not found.

### 3. Get All Students
- **Method**: `GET`
- **Endpoint**: `/get`
- **Description**: Retrieves a list of all students.
- **Response**:
  - **Status**: `200 OK`
  - **Body**: Array of student objects.
  ```json
  [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "course": "Computer Science"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "course": "Mathematics"
    }
  ]
  ```

### 4. Update Student
- **Method**: `PUT`
- **Endpoint**: `/update/{id}`
- **Description**: Updates an existing student.
- **Path Parameters**:
  - `id` (Long): The student's ID.
- **Example URL**: `http://127.0.0.1:8080/v1/api/students/update/1`
- **Request Body**:
  ```json
  {
    "name": "John Doe Updated",
    "email": "john.updated@example.com",
    "course": "Data Science"
  }
  ```
- **Response**:
  - **Status**: `200 OK` (if updated)
  - **Body**: The updated student object.
  ```json
  {
    "id": 1,
    "name": "John Doe Updated",
    "email": "john.updated@example.com",
    "course": "Data Science"
  }
  ```
  - **Status**: `200 OK` with `null` if student not found.

### 5. Delete Student
- **Method**: `DELETE`
- **Endpoint**: `/delete/{id}`
- **Description**: Deletes a student by their ID.
- **Path Parameters**:
  - `id` (Long): The student's ID.
- **Example URL**: `http://127.0.0.1:8080/v1/api/students/delete/1`
- **Response**:
  - **Status**: `200 OK`

## Error Handling
- All endpoints may return `500 Internal Server Error` if there's a server-side issue (e.g., database connection problems).

## Running the Application
1. Ensure you have Java 21 and Maven installed.
2. Navigate to the project directory.
3. Run `mvn spring-boot:run`.
4. The application will start on `http://localhost:8080`.

## Database
- Uses H2 in-memory database.
- H2 Console: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:studentdb`
  - Username: `sa`
  - Password: (leave blank)

## Testing with Postman
Import the provided Postman collection (`StudentManagement_Postman_Collection.json`) to test the APIs.
