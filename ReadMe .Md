
# Blog Application - Backend

This is a Node.js backend application for a blog platform. It includes authentication (signup, login), blog creation, editing, deletion, and comment management features. The backend connects to MongoDB, handles email verification, and uses JWT tokens for user authentication.

## Features

- **User Authentication** (Signup, Login)
- **Email Verification**
- **Create, Edit, Delete Blogs** (Admin, Editor permissions)
- **Add, Delete, and View Comments** (Authenticated users only)

---

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (version 14 or above)
- MongoDB (or use MongoDB Atlas)
- A Gmail account for email verification (or any other email service)

---

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Install Dependencies

Run the following command to install all dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
DB_URI=mongodb+srv://YOUR_MONGO_URI
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

- **DB_URI:** MongoDB connection URI (use MongoDB Atlas if you're using a cloud database).
- **JWT_SECRET:** Secret string used for generating JWT tokens.
- **EMAIL_USER & EMAIL_PASS:** Your Gmail account credentials for email verification.

### 4. Start the Application

Run the application using the following command:

```bash
npm start
```

The backend should now be running on `http://localhost:3000`.

---

## API Endpoints

### Authentication

- **POST `/api/auth/signup`**  
  Create a new user account.  
  **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "User"
  }
  ```

- **POST `/api/auth/login`**  
  Login and get a JWT token.  
  **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

---

### Blogs

- **POST `/api/blogs`**  
  Create a new blog (Admin only).  
  **Headers:**
  ```json
  {
    "Authorization": "Bearer YOUR_JWT_TOKEN"
  }
  ```
  **Body:**
  ```json
  {
    "title": "My First Blog",
    "content": "This is the content of the blog."
  }
  ```

- **GET `/api/blogs`**  
  Get all blogs.  
  **Authorization:** Optional (public route).

- **PUT `/api/blogs/:id`**  
  Edit an existing blog (Admin or Editor only).  
  **Headers:**
  ```json
  {
    "Authorization": "Bearer YOUR_JWT_TOKEN"
  }
  ```
  **Body:**
  ```json
  {
    "title": "Updated Blog Title",
    "content": "Updated content."
  }
  ```

- **DELETE `/api/blogs/:id`**  
  Delete a blog (Admin only).  
  **Headers:**
  ```json
  {
    "Authorization": "Bearer YOUR_JWT_TOKEN"
  }
  ```

---

### Comments

- **POST `/api/comments`**  
  Add a comment to a blog.  
  **Headers:**
  ```json
  {
    "Authorization": "Bearer YOUR_JWT_TOKEN"
  }
  ```
  **Body:**
  ```json
  {
    "blogId": "blog_id_here",
    "content": "This is a comment."
  }
  ```

- **GET `/api/comments/:blogId`**  
  Get all comments for a specific blog.  
  **Parameters:** `blogId` (ID of the blog)

- **DELETE `/api/comments/:id`**  
  Delete a comment made by the user.  
  **Headers:**
  ```json
  {
    "Authorization": "Bearer YOUR_JWT_TOKEN"
  }
  ```

---

## Testing

You can test the API using tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

### Example Tests in Postman

- **Sign up a new user:**
  - Method: `POST`
  - URL: `http://localhost:3000/api/auth/signup`
  - Body (JSON):
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123",
      "role": "User"
    }
    ```

- **Login to get JWT token:**
  - Method: `POST`
  - URL: `http://localhost:3000/api/auth/login`
  - Body (JSON):
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```

- **Create a new blog (Admin only):**
  - Method: `POST`
  - URL: `http://localhost:3000/api/blogs`
  - Headers:
    ```json
    {
      "Authorization": "Bearer YOUR_JWT_TOKEN"
    }
    ```
  - Body (JSON):
    ```json
    {
      "title": "My First Blog",
      "content": "This is the content of the blog."
    }
    ```

---


