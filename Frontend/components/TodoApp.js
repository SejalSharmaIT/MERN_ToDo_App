import axios from 'axios';
import { useEffect, useState } from 'react';

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  const token = localStorage.getItem('token');

  // Load tasks from backend
  const loadTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: token }
      });
      setTasks(res.data);
    } catch (err) {
      console.error("❌ Failed to load tasks:", err);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (!text.trim()) return;
    try {
      await axios.post('http://localhost:5000/api/tasks', { text }, {
        headers: { Authorization: token }
      });
      setText('');
      loadTasks();
    } catch (err) {
      console.error("❌ Add task failed:", err);
    }
  };

  // Toggle completion
  const toggleDone = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed: !completed }, {
        headers: { Authorization: token }
      });
      loadTasks();
    } catch (err) {
      console.error("❌ Toggle failed:", err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: token }
      });
      loadTasks();
    } catch (err) {
      console.error("❌ Delete failed:", err);
    }
  };

  // Edit task text
  const updateTaskText = async (id, newText) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { text: newText }, {
        headers: { Authorization: token }
      });
      loadTasks();
    } catch (err) {
      console.error("❌ Edit failed:", err);
    }
  };

 useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: token }
      });
      setTasks(res.data);
    } catch (err) {
      console.error("❌ Failed to load tasks:", err);
    }
  };

  fetchTasks();
}, [token]);

  return (
    <div className="container">
      <h2>📝 My To-Do App</h2>
    

      <div className="add-task">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.map(t => (
          <li key={t._id} className="task-item">
           <input
  value={t.text}
  onChange={e => updateTaskText(t._id, e.target.value)}
  className={t.completed ? 'completed' : ''}
/>


            <button onClick={() => toggleDone(t._id, t.completed)}>Done</button>
            <button onClick={() => deleteTask(t._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
