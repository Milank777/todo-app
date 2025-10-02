const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let tasks = [];
let idCounter = 1;

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title, priority } = req.body;
  const task = { id: idCounter++, title, priority, completed: false };
  tasks.push(task);
  res.json(task);
});

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = req.body.completed ?? task.completed;
    task.title = req.body.title ?? task.title;
    task.priority = req.body.priority ?? task.priority;
    res.json(task);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== id);
  res.json({ message: 'Deleted successfully' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));