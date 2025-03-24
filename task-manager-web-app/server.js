const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Task data storage (in-memory)
let tasks = [];
let idCounter = 1;

// Priority order mapping for sorting
const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };

// Routes
app.get("/", (req, res) => {
  const filter = req.query.filter || "All"; // Task completion filter
  const priorityFilter = req.query.priority || "All"; // Task priority filter
  const searchQuery = req.query.search ? req.query.search.toLowerCase() : "";

  // Filter tasks based on completion status
  let filteredTasks = tasks;
  if (filter === "Completed") {
    filteredTasks = filteredTasks.filter(task => task.completed === true);
  } else if (filter === "Incomplete") {
    filteredTasks = filteredTasks.filter(task => task.completed === false);
  }

  // Apply search filter (case-insensitive) for title, description, priority, and completion status
  if (searchQuery) {
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery) ||
      task.description.toLowerCase().includes(searchQuery) ||
      task.priority.toLowerCase().includes(searchQuery) ||
      (task.completed ? 'completed' : 'incomplete').includes(searchQuery) // Include completion status in the search
    );
  }

  // Filter tasks by priority if a priority is selected
  if (priorityFilter && priorityFilter !== "All") {
    filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
  }

  // Sort tasks by completion status (incomplete first) and then by priority
  filteredTasks.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed - b.completed; // Incomplete first
    return priorityOrder[a.priority] - priorityOrder[b.priority]; // High priority first
  });

  res.render("index", { 
    tasks: filteredTasks, 
    filter, 
    priorityFilter, // Pass the priority filter to the view
    searchQuery 
  });
});

app.post("/add-task", (req, res) => {
  const { title, description, priority } = req.body;
  if (!title) return res.status(400).send("Task title is required.");
  
  tasks.push({ 
    id: idCounter++, 
    title, 
    description, 
    priority: priority || "Medium", // Default priority is Medium
    completed: false 
  });
  res.redirect("/");
});

app.post("/toggle-task/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) task.completed = !task.completed;
  res.redirect("/");
});

app.post("/delete-task/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.redirect("/");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
