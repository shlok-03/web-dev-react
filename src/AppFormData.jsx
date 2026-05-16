import { useState, useEffect } from 'react';
import './App.css'
import './components/TaskCard/TaskCard.css'
import TaskCard from './components/TaskCard/TaskCard';


const name = "Andrey";


function App() {


  //run on rendering
  //useEffect(() => {console.log("use effect running")});

  //run once
  //useEffect(() => {console.log("Run once")}, []);



  const [tasks, updateTasks] =  useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // const [showValidation, updateShowValidation] = useState(false);

  useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks)); 
  }, [tasks]);

  function addTask(formElement) {
    //const formData = new FormData(formElement);

    const { title, priority, dueDate } = Object.fromEntries(new FormData(formElement));

    //const title = formData.get("title");


    if (title.trim() === "") {
      //updateShowValidation(true);
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title,
      priority: priority,
      dueDate: dueDate,
    }



    updateTasks([...tasks, newTask]);

    formElement.reset();
    //updateShowValidation(false);
  }

  function onDeleteTask(id) {
        console.log("Deleting task");
        updateTasks([...tasks.filter(t => t.id !== id)]);
  }

  return (
  <>
    <h1>Hello {name} below are your tasks:</h1>
    <form onSubmit={(e) => {
          e.preventDefault();
          addTask(e.currentTarget);
       }}>
      <div>
        <label>Task name:</label>
        <input
          type='text'
          name='title'
          required
        />
          {/* { showValidation && <p className="validation">Title required</p>} */}
      </div>
      <div>
        <label>Priority:</label>
        <select
          name='priority'
          defaultValue="High"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
       
      </div>
      <div>
        <label>Due date:</label>
        <input
          type='date'
          name='dueDate'
          required
        />
      </div>
      <button>Add</button>
    </form>
    
    {
      tasks.map(task => (
        <TaskCard key={task.id} {...task} onDeleteTask={() => onDeleteTask(task.id)}/>
      ))
    }
    
  </>
);


}

export default App;
