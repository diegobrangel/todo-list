import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reminder, setReminder] = useState("");

  const API = "https://todo-list-cvbk.onrender.com";

  async function loadTasks() {
    const response = await axios.get(API);
    setTasks(response.data);
  }

  async function createTask() {
    await axios.post(API, {
      title,
      description,
      reminder,
    });

    setTitle("");
    setDescription("");
    setReminder("");

    loadTasks();
  }

  async function deleteTask(id) {
    await axios.delete(`${API}/${id}`);
    loadTasks();
  }

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>TODO LIST</h1>

      <input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <input
        type="datetime-local"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
      />

      <br /><br />

      <button onClick={createTask}>
        Criar Task
      </button>

      <hr />

      {tasks.map(task => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>{task.reminder}</p>

          <button onClick={() => deleteTask(task.id)}>
            Remover
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
