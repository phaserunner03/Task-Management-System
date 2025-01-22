# Task-Management-System
This application provides a secure task management system, allowing authenticated users to create, retrieve, update, and delete their own tasks. Authentication is implemented using JWT, ensuring that users can only access and manage their own data. 

## API Documentation

### Base URL: http://0.0.0.0:3000/api

### Endpoints:

**1. Tasks**

* **GET /api/tasks/getAllTasks:** Retrieves a list of all tasks with default pagination of page no 1 and size 10.
* * **Parameters:** `page no` and `page size`.
  * **Response:** Array of task objects.
  * **Example Response:**
    ```json
    [
      {
        "id": "1",
        "title": "Sample Task",
        "description": "Description of the task",
        "status": "Pending",
        "created_at": "2025-01-01T12:00:00Z",
        "updated_at": "2025-01-01T12:00:00Z"
      }
    ]
    ```

* **GET /api/tasks/getTaskById/:id:** Retrieves a specific task by its ID.
  * **Parameters:** `id` (string) - Task ID.
  * **Response:** Task object or 404 error if not found.
  * **Example Response:**
    ```json
    {
      "id": "1",
      "title": "Sample Task",
      "description": "Description of the task",
      "status": "Pending",
      "created_at": "2025-01-01T12:00:00Z",
      "updated_at": "2025-01-01T12:00:00Z"
    }
    ```

* **POST /api/tasks/createTask:** Creates a new task.
  * **Request Body:** JSON object containing `title`, `description`, and `status`.
  * **Response:** The created task object or 400 error for invalid input.
  * **Example Request Body:**
    ```json
    {
      "title": "New Task",
      "description": "Details about the new task",
      "status": "In Progress"
    }
    ```
  * **Example Response:**
    ```json
    {
      "id": "2",
      "title": "New Task",
      "description": "Details about the new task",
      "status": "In Progress",
      "created_at": "2025-01-01T12:05:00Z",
      "updated_at": "2025-01-01T12:05:00Z"
    }
    ```

* **PUT /api/tasks/updateTask/:id:** Updates an existing task by its ID.
  * **Parameters:** `id` (string) - Task ID.
  * **Request Body:** JSON object containing any of `title`, `description`, or `status`.
  * **Response:** The updated task object or 404 error if not found.
  * **Example Request Body:**
    ```json
    {
      "title": "Updated Task Title",
      "status": "Completed"
    }
    ```
  * **Example Response:**
    ```json
    {
      "id": "2",
      "title": "Updated Task Title",
      "description": "Details about the new task",
      "status": "Completed",
      "created_at": "2025-01-01T12:05:00Z",
      "updated_at": "2025-01-01T12:10:00Z"
    }
    ```

* **DELETE /api/tasks/deleteTask/:id:** Deletes a task by its ID.
  * **Parameters:** `id` (string) - Task ID.
  * **Response:** 404 error if not found or 400 error if duplicate IDs are detected.

* **DELETE /api/tasks/deleteAll:** Deletes all tasks.
  * **Response:** 404 error if not found or 400 error if duplicate IDs are detected.


**2. Authentication**

* **POST /api/auth/register:** Registers a new user.
  * **Request Body:** JSON object containing `username`, `email`, and `password`.
  * **Response:** 201 Created or 400 error for invalid input.

* **POST /api/auth/login:** Authenticates an existing user.
  * **Request Body:** JSON object containing `email` and `password`.
  * **Response:** 200 OK with JWT token or 401 Unauthorized if authentication fails.

## Running the API

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/task-management-api.git
