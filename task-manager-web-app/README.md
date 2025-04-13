# Task Manager Web Application

A full-featured task management web application built with Node.js, Express, PostgreSQL, and EJS templates. This application allows users to create, read, update, and delete tasks with additional features like search, filtering, and validation.

## Features

- ✅ Create tasks with title, description, and priority levels
- ✅ Mark tasks as complete/incomplete
- ✅ Edit existing tasks
- ✅ Delete tasks
- ✅ Search functionality
- ✅ Filter tasks by status (All/Completed/Incomplete)
- ✅ Responsive design that works on mobile and desktop
- ✅ Client-side and server-side validation
- ✅ PostgreSQL database backend
- ✅ Clean, modern UI with animations

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Templating**: EJS
- **Styling**: CSS with responsive design
- **Environment**: Dotenv for configuration

## Project Structure
Copy
task-manager/
├── config/
│   └── db.js           # Database connection configuration
├── controllers/
│   └── taskController.js # Task-related route handlers
├── models/
│   └── taskModel.js    # Database operations for tasks
├── public/
│   └── styles.css      # CSS styles
├── routes/
│   └── taskRoutes.js   # Express routes
├── views/
│   ├── partials/       # EJS partial templates
│   └── index.ejs       # Main view template
├── .env                # Environment variables
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies and scripts
└── server.js           # Application entry point
└── README.md          # Application README.md

## Configuration
The application requires the following environment variables (set in .env):

DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=your_database_port

## API Endpoints
Method	Endpoint	Description
GET	/	Display all tasks
POST	/add-task	Create a new task
POST	/toggle-task/:id	Toggle task completion status
POST	/delete-task/:id	Delete a task
PUT	/tasks/:id	Update a task

## Link to Code
https://github.com/sleepykodoku/task-manager-web-app.git