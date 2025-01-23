# Task Management System

This application provides a secure task management system, allowing authenticated users to create, retrieve, update, and delete their tasks. Authentication is implemented using JWT, ensuring users can only access and manage their own data.

---

## Features

- **User Authentication**: Secure registration and login using JWT.
- **Task Management**:
  - Create, view, update, and delete tasks.
  - Pagination support for task retrieval.
- **Data Privacy**: Each user’s tasks are private and accessible only to them.

---

## API Documentation

### Base URL

```
http://0.0.0.0:3000/api
```

---

### Authentication Endpoints

#### 1. **Register User**

**Endpoint:**  
`POST /auth/register`

**Request Body:**
```json
{
  "username": "yourUsername",
  "password": "yourPassword"
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

**Example cURL:**
```bash
curl -X POST http://0.0.0.0:3000/api/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username": "johnDoe",
  "password": "securePassword123"
}'
```

---

#### 2. **Login User**

**Endpoint:**  
`POST /auth/login`

**Request Body:**
```json
{
  "username": "yourUsername",
  "password": "yourPassword"
}
```

**Response:**
```json
{
  "token": "JWT-TOKEN"
}
```

**Example cURL:**
```bash
curl -X POST http://0.0.0.0:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username": "johnDoe",
  "password": "securePassword123"
}'
```

---

### Task Endpoints

#### 1. **Get All Tasks (Paginated)**

**Endpoint:**  
`GET /tasks/getAllTasks`

**Headers:**
```json
{
  "auth-token": "JWT-TOKEN"
}
```

**Query Parameters:**
- `page` (optional, default: 1)
- `limit` (optional, default: 10)

**Response:**
```json
{
  "tasks": [
    {
      "id": "1",
      "title": "Task 1",
      "description": "Sample task description",
      "status": "Pending",
      "created_at": "2025-01-01T12:00:00Z",
      "updated_at": "2025-01-01T12:00:00Z"
    }
  ],
  "currentPage": 1,
  "totalPages": 1,
  "totalTasks": 1
}
```

**Example cURL:**
```bash
curl -X GET "http://0.0.0.0:3000/api/tasks/getAllTasks?page=1&limit=10" \
-H "auth-token: YOUR_JWT_TOKEN"
```

---

#### 2. **Get Task By ID**

**Endpoint:**  
`GET /tasks/getTask/:id`

**Headers:**
```json
{
  "auth-token": "JWT-TOKEN"
}
```

**Response:**
```json
{
  "id": "1",
  "title": "Task 1",
  "description": "Sample task description",
  "status": "Pending",
  "created_at": "2025-01-01T12:00:00Z",
  "updated_at": "2025-01-01T12:00:00Z"
}
```

**Example cURL:**
```bash
curl -X GET http://0.0.0.0:3000/api/tasks/getTask/1 \
-H "auth-token: YOUR_JWT_TOKEN"
```

---

#### 3. **Create Task**

**Endpoint:**  
`POST /tasks/createTask`

**Headers:**
```json
{
  "auth-token": "JWT-TOKEN"
}
```

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Details of the task",
  "status": "Pending"
}
```

**Response:**
```json
{
  "id": "2",
  "title": "New Task",
  "description": "Details of the task",
  "status": "Pending",
  "created_at": "2025-01-01T12:05:00Z",
  "updated_at": "2025-01-01T12:05:00Z"
}
```

**Example cURL:**
```bash
curl -X POST http://0.0.0.0:3000/api/tasks/createTask \
-H "auth-token: YOUR_JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "title": "New Task",
  "description": "Details of the task",
  "status": "Pending"
}'
```

---

#### 4. **Update Task**

**Endpoint:**  
`PUT /tasks/updateTask/:id`

**Headers:**
```json
{
  "auth-token": "JWT-TOKEN"
}
```

**Request Body (Partial Update Allowed):**
```json
{
  "title": "Updated Title",
  "status": "Completed"
}
```

**Response:**
```json
{
  "id": "2",
  "title": "Updated Title",
  "description": "Details of the task",
  "status": "Completed",
  "created_at": "2025-01-01T12:05:00Z",
  "updated_at": "2025-01-01T12:10:00Z"
}
```

**Example cURL:**
```bash
curl -X PUT http://0.0.0.0:3000/api/tasks/updateTask/2 \
-H "auth-token: YOUR_JWT_TOKEN" \
-H "Content-Type: application/json" \
-d '{
  "title": "Updated Title",
  "status": "Completed"
}'
```

---

#### 5. **Delete Task**

**Endpoint:**  
`DELETE /tasks/deleteTask/:id`

**Headers:**
```json
{
  "auth-token": "JWT-TOKEN"
}
```

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

**Example cURL:**
```bash
curl -X DELETE http://0.0.0.0:3000/api/tasks/deleteTask/2 \
-H "auth-token: YOUR_JWT_TOKEN"
```

---

#### 6. **Delete All Tasks**

**Endpoint:**  
`DELETE /tasks/deleteAll`

**Headers:**
```json
{
  "auth-token": "JWT-TOKEN"
}
```

**Response:**
```json
{
  "message": "5 tasks deleted"
}
```

**Example cURL:**
```bash
curl -X DELETE http://0.0.0.0:3000/api/tasks/deleteAll \
-H "auth-token: YOUR_JWT_TOKEN"
```

---

## Running the Application

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/task-management.git
   ```

2. **Install Dependencies:**
   ```bash
   cd task-management
   npm install
   ```

3. **Run the Application:**
   ```bash
   npm start
   ```

4. **Access the API:**  
   The API will be running on `http://0.0.0.0:3000`.

---
