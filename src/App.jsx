import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Finish homework" },
    { id: 2, title: "Go to gym" },
    { id: 3, title: "Buy groceries" },
  ]);

  function addTask() {
    const newTask = { id: Date.now(), title: "New Task" };
    setTasks([...tasks, newTask]);
  }

  function removeLastTask() {
    setTasks(tasks.slice(0, -1));
  }

  return (
    <div>
      <p>Total Tasks: {tasks.length}</p>

      {tasks.map((task) => (
        <div key={task.id}>
          <span>{task.title}</span>
          <button onClick={() => console.log(task.id)}>Show ID</button>
        </div>
      ))}

      <button onClick={addTask}>Add New Task</button>

      <button onClick={removeLastTask}>Remove Last Task</button>
    </div>
  );
}

export default App;