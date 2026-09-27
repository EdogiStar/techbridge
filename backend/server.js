const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const tasksFilePath = path.join(
  __dirname,
  "data",
  "tasks.json"
);

app.use(express.json());
app.use(cors());

function getTasks() {
  const data = fs.readFileSync(tasksFilePath, "utf-8");
  return JSON.parse(data);
}

function saveTasks(tasks) {
  fs.writeFileSync(
    tasksFilePath,
    JSON.stringify(tasks, null, 2)
  );
}

app.get("/api/tasks", (req, res) => {
  const tasks = getTasks();

  res.json(tasks);
});

app.get("/api/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const tasks = getTasks();

  const task = tasks.find(
    (task) => task.id === taskId
  );

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  res.json(task);
});

app.put("/api/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);
  const { status } = req.body;

  const validStatuses = [
    "completed",
    "in-progress",
    "not-started"
  ];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid status"
    });
  }

  const tasks = getTasks();

  const task = tasks.find(
    (task) => task.id === taskId
  );

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  task.status = status;

  saveTasks(tasks);

  res.json(task);
});

app.listen(PORT, () => {
  console.log(
    `TechBridge API running at http://localhost:${PORT}`
  );
});
