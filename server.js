const express = require("express");
const mongoose = require("mongoose"); // Mongoose for MongoDB interaction

const app = express();
const port = 3000; // Define port to listen on

// Connect to MongoDB database
mongoose
  .connect("mongodb://localhost:27017/student_tasks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define Course and Task Schemas
const courseSchema = new mongoose.Schema({
  courseId: String,
  name: String,
  description: String,
});

const taskSchema = new mongoose.Schema({
  courseId: String,
  name: String,
  dueDate: Date,
  details: String,
});

const Course = mongoose.model("Course", courseSchema);
const Task = mongoose.model("Task", taskSchema);

// Route to retrieve tasks for a specific course
app.get("/courses/:courseId/tasks", async (req, res) => {
  const { courseId } = req.params;

  try {
    const tasks = await Task.find({ courseId }); // Find tasks with matching courseId

    if (!tasks.length) {
      return res
        .status(404)
        .json({ message: "No tasks found for this course" });
    }

    res.json(tasks); // Return JSON response with tasks
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.get("/", (req, res) => {
  res.send("API is running");
});
app.listen(port, () => console.log(`Server listening on port ${port}`));
