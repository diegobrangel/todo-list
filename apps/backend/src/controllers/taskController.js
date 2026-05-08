const tasks = require("../models/taskModel");

exports.getTasks = (req, res) => {
  res.json(tasks);
};

exports.createTask = (req, res) => {
  const { title, description, reminder } = req.body;

  const newTask = {
    id: Date.now(),
    title,
    description,
    reminder,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
};

exports.deleteTask = (req, res) => {
  const id = Number(req.params.id);

  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Task não encontrada",
    });
  }

  tasks.splice(index, 1);

  res.json({
    message: "Task removida",
  });
};
