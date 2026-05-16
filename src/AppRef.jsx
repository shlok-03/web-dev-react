import { useState, useEffect, useRef } from 'react';
import './App.css'
import './components/TaskCard/TaskCard.css'
import TaskCard from './components/TaskCard/TaskCard';


const name = "Andrey";


function App() {


  //run on rendering
  //useEffect(() => {console.log("use effect running")});

  //run once
  //useEffect(() => {console.log("Run once")}, []);



  const titleRef = useRef("");
  const priorityRef = useRef("High");
  const dueDateRef = useRef("");

  const [tasks, updateTasks] =  useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [showValidation, updateShowValidation] = useState(false);

  useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks)); 
  }, [tasks]);

  function addTask() {


    if (!titleRef.current.value) {
      updateShowValidation(true);
      return;
    }
    
    const newTask = {
      id: Date.now(),
      title: titleRef.current.value,
      priority: priorityRef.current.value,
      dueDate: dueDateRef.current.value,
    }



    updateTasks([...tasks, newTask]);

    // Clear all input fields
    titleRef.current.value = "";
    priorityRef.current.value = "High";
    dueDateRef.current.value = "";
    
    updateShowValidation(false);
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
          addTask();
       }}>
      <div>
        <label>Task name:</label>
        <input
          type='text'
          name='title'
          ref={titleRef}
          defaultValue={titleRef.current.value}
        />
          { showValidation && <p className="validation">Title required</p>}
      </div>
      <div>
        <label>Priority:</label>
        <select
          name='priority'
          ref={priorityRef}
          defaultValue={priorityRef.current.value}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
       
      </div>
      <div>
        <label>Due date:</label>
        <input
          type='text'
          name='dueDate'
          ref={dueDateRef}
          defaultValue={dueDateRef.current.value}
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
