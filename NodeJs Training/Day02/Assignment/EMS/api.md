# Employee Management System API Documentation

## Base URL
```
http://localhost:3000
```

## Endpoints

### 1. Create Employee
**POST** `/employees`

Creates a new employee.

**Request Body:**
```json
{
  "name": "string (required)",
  "role": "string (required)",
  "salary": "number (optional, defaults to 0)"
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "name": "John Doe",
  "role": "Manager",
  "salary": 75000
}
```

**Error Response (400 Bad Request):**
```
Name and role required
```

### 2. Get All Employees
**GET** `/employees`

Retrieves all employees.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Amit Sharma",
    "role": "Developer",
    "salary": 60000
  },
  {
    "id": 2,
    "name": "John Doe",
    "role": "Manager",
    "salary": 75000
  }
]
```

### 3. Get Employee by ID
**GET** `/employees/:id`

Retrieves a specific employee by their ID.

**Parameters:**
- `id` (number): Employee ID

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Amit Sharma",
  "role": "Developer",
  "salary": 60000
}
```

**Error Response (404 Not Found):**
```
Employee not found
```

### 4. Update Employee
**PUT** `/employees/:id`

Updates an existing employee.

**Parameters:**
- `id` (number): Employee ID

**Request Body:**
```json
{
  "name": "string (optional)",
  "role": "string (optional)",
  "salary": "number (optional)"
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "Updated Name",
  "role": "Senior Developer",
  "salary": 80000
}
```

**Error Response (404 Not Found):**
```
Employee not found
```

### 5. Delete Employee
**DELETE** `/employees/:id`

Deletes an employee by their ID.

**Parameters:**
- `id` (number): Employee ID

**Response (200 OK):**
```
Employee deleted
```

**Error Response (404 Not Found):**
```
Employee not found
```

## Data Model

### Employee
```json
{
  "id": "number (auto-generated)",
  "name": "string",
  "role": "string",
  "salary": "number"
}
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found

## Running the Server

To start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`