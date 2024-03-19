const courseInput = document.getElementById("course-id");
const showTasksBtn = document.getElementById("show-tasks");
const taskList = document.getElementById("task-list");

showTasksBtn.addEventListener("click", async () => {
  const courseId = courseInput.value.trim();
  // Construct the URL with the actual course ID
  const url = `/courses/${courseId}/tasks`;

  try {
    const response = await fetch(url);
    const tasks = await response.json();

    taskList.innerHTML = ""; // Clear previous task list

    if (!tasks.length) {
      taskList.innerHTML = "<p>No tasks found for this course.</p>";
      return;
    }

    tasks.forEach((task) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <h3>${task.name}</h3>
        <p>Due Date: ${task.dueDate.slice(0, 10)}</p>
        <p>${task.details ? task.details : ""}</p>
      `;
      taskList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    taskList.innerHTML = "<p>An error occurred. Please try again.</p>";
  }
});
