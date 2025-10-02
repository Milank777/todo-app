const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

const API_URL = 'http://localhost:5000/tasks';

async function fetchTasks() {
  const res = await fetch(API_URL);
  const tasks = await res.json();
  renderTasks(tasks);
}

function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `${task.completed ? 'completed' : ''} ${task.priority.toLowerCase()}`;
    li.innerHTML = `
      <span onclick="toggleComplete(${task.id}, ${!task.completed})">${task.title} [${task.priority}]</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">X</button>
    `;
    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener('click', async () => {
  const title = taskInput.value.trim();
  const priority = prioritySelect.value;
  if (!title) return;
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, priority })
  });
  taskInput.value = '';
  fetchTasks();
});

async function toggleComplete(id, completed) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  });
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  fetchTasks();
}

fetchTasks();