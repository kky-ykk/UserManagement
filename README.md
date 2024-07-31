# UserManagement

## Overview

**UserManagement** is a web application that allows users to sign up, log in, and manage their profile information. The application uses a modern tech stack with a React frontend and a Node.js backend, leveraging MongoDB for data storage. The login feature includes token-based authentication, where the token is stored in `localStorage` and used for subsequent API calls to secure endpoints.

<a href="https://usermanagement-69ja.onrender.com/">LIVE APP</a>

## Technologies Used

### Frontend
- **HTML/CSS/JavaScript**: Core web technologies used for structure, styling, and basic interactivity.
- **React**: A JavaScript library for building user interfaces, providing a dynamic and responsive experience.
- **Bootstrap**: A CSS framework used for designing responsive web pages.

### Backend
- **Node.js**: A JavaScript runtime for server-side programming, allowing you to build scalable network applications.
- **Express**: A web application framework for Node.js, used to create the RESTful API for the backend.
- **MongoDB**: A NoSQL database used for storing user data, including login credentials.

## Features

### User Registration
- Users can sign up by providing their name, email, mobile number, address, and password.
- User data is stored in MongoDB.

### User Login
- Users can log in with their email and password.
- On successful login, a token is generated and stored in `localStorage`.
- This token is used to authenticate subsequent API requests.

### Token-Based Authentication
- **Token Storage**: The authentication token is stored in `localStorage` after login.
- **Authenticated Requests**: The token is sent as a header (`Authorization: Bearer <token>`) with requests to protected endpoints on the server.

### Example API Endpoints

#### 1. **Signup**
   - **Endpoint**: `/user/signup`
   - **Method**: `POST`
   - **Description**: Registers a new user.
   - **Example Request**:
     ```json
     {
       "name": "John Doe",
       "email": "john.doe@example.com",
       "mobile": "1234567890",
       "address": "123 Main St",
       "password": "yourpassword"
     }
     ```

#### 2. **Login**
   - **Endpoint**: `/user/login`
   - **Method**: `POST`
   - **Description**: Authenticates a user and returns a token.
   - **Example Request**:
     ```json
     {
       "email": "john.doe@example.com",
       "password": "yourpassword"
     }
     ```

#### 3. **Get Profile**
   - **Endpoint**: `/user/getProfile`
   - **Method**: `GET`
   - **Description**: Retrieves the logged-in user's profile information.
   - **Headers**:
     ```json
     {
       "Authorization": "Bearer <token>"
     }
     ```

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/kky-ykk/UserManagement.git
