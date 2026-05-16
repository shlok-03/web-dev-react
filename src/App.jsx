import './App.css'
import './components/TaskCard/TaskCard.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import StatsPage from './pages/StatsPage';
import HomePage from './pages/HomePage';
import Layout from './pages/Layout';
import TaskDetail from './components/TaskDetail/TaskDetail';
import TaskContextProvider from './components/TaskContextProvider/TaskContextProvider';
import { ThemeContextProvider} from './context/ThemeContextProvider';


const tasks = [
  {
    id: 1,
    title: "Set up project folder",
    dueDate: "2025-05-20",
    priority: "High",
    assignedTo: "Shlok",
    status: "Done",
  },
  {
    id: 2,
    title: "Build navigation bar",
    dueDate: "2025-05-22",
    priority: "High",
    assignedTo: "Shlok",
    status: "Pending",
  },
  {
    id: 3,
    title: "Design homepage layout",
    dueDate: "2025-05-25",
    priority: "Medium",
    assignedTo: "Shlok",
    status: "Pending",
  },
  {
    id: 4,
    title: "Write contact form",
    dueDate: "2025-05-28",
    priority: "Medium",
    assignedTo: "Shlok",
    status: "Pending",
  },
  {
    id: 5,
    title: "Deploy to GitHub Pages",
    dueDate: "2025-05-30",
    priority: "Low",
    assignedTo: "Shlok",
    status: "Pending",
  },
];

function App() {
  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            dueDate={task.dueDate}
            priority={task.priority}
            assignedTo={task.assignedTo}
            status={task.status}  
          />
        ))}
      </div>
    </div>
  );
}

export default App;
