# Prop Drilling Problem

## Definition

**Prop Drilling** (also called "props hell" or "threading") is a pattern in React where data and functions are passed through multiple component layers even though intermediate components don't directly use them. The props are simply passed down the component tree until reaching a component that actually needs them.

## The Problem

Prop drilling creates several issues:

1. **Tight Coupling**: Components become tightly coupled to their parent's props, even if they don't use them
2. **Maintenance Burden**: Adding/removing props requires updating multiple component signatures
3. **Reduced Reusability**: Components are harder to reuse because they're tied to a specific prop structure
4. **Code Complexity**: Component signatures become cluttered with unused props
5. **Prop Forwarding**: Intermediate components must forward props they don't use: `{...props}`
6. **Difficult Refactoring**: Changes to prop structure ripple through many components

## Our Application Example

In our Task application, prop drilling occurs in this chain:

```
App.jsx 
  ↓ (passes: tasks, addTask, onDeleteTask)
HomePage.jsx
  ↓ (passes: tasks, onDeleteTask)
TaskList.jsx
  ↓ (passes: individual task properties + onDeleteTask)
TaskCard.jsx (actually uses them)
```

## In Code

### App Component (Source of Props)
```jsx
function App() {
  const [tasks, updateTasks] = useState([]);
  
  function addTask(formData) { ... }
  function onDeleteTask(id) { ... }

  return (
    <HomePage
      tasks={tasks}
      addTask={addTask}
      onDeleteTask={onDeleteTask}
    />
  );
}
```

### HomePage Component (Intermediate - Drills Props)
```jsx
function HomePage({tasks, addTask, onDeleteTask}) {
  return (
    <>
      <TaskForm addTask={addTask}/>  
      <TaskList tasks={tasks} onDeleteTask={onDeleteTask}/>
    </>
  );
}
```

### TaskList Component (Intermediate - Doesn't Use Props)
```jsx
function TaskList({ tasks, onDeleteTask }) {
  // Doesn't directly use 'onDeleteTask', just passes it
  return (
    tasks.map(task => (
      <TaskCard 
        {...task} 
        onDeleteTask={() => onDeleteTask(task.id)} 
      />
    ))
  );
}
```

### TaskCard Component (Final Consumer)
```jsx
function TaskCard({id, title, dueDate, priority, onDeleteTask}) {
  // Actually uses the data and function
  return (
    <div className="task-item">
      <h3>{title}</h3>
      <button onClick={onDeleteTask}>Delete</button>
    </div>
  );
}
```

## Problems in Our App

1. **TaskList** doesn't use `onDeleteTask` but must accept and forward it
2. **HomePage** must know about all props needed by its children
3. If TaskCard needs a new prop, it must be added to: App → HomePage → TaskList → TaskCard
4. Hard to test TaskList in isolation because it's dependent on parent props

## Solutions

1. **Context API**: Store shared state in React Context for global access
2. **State Management Library**: Use Redux, Zustand, or Jotai
3. **Custom Hooks**: Extract logic into custom hooks that components can use directly
4. **Component Composition**: Restructure components to reduce nesting levels
5. **Props with Objects**: Group related props into objects to reduce parameter count

---

## Context API Deep Dive

### What is Context API?

React Context is a built-in feature that allows you to share state and functions across many components **without passing props through every level**. It creates a "tunnel" to pass data directly to components that need it, no matter how deeply nested they are.

**Key Concept**: Instead of passing data down through intermediate components, you "provide" data from a parent and "consume" it in child components.

### When to Use Context

Use Context API when:

**Data needs to flow to many nested components** (like your tasks, which go from App → HomePage → TaskList → TaskCard)

**Multiple components need the same state** (theme, language, user authentication, global app state)

**Props would need to pass through many intermediate components** (the classic prop drilling scenario)

**You want to avoid prop drilling without adding heavy dependencies** (no need for Redux initially)

Don't use Context API when:

**Data changes very frequently** (Context causes all consumers to re-render)

**Simple parent-child data passing** (just use props, they're simpler and clearer)

### How Context Works

#### Step 1: Create a Context

```jsx
// TaskContext.js
import { createContext } from 'react';

export const TaskContext = createContext();
```

#### Step 2: Create a Provider Component

A Provider component wraps your app and provides state to all child components:

```jsx
// TaskProvider.jsx
import { useState } from 'react';
import { TaskContext } from './TaskContext';

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  function addTask(formData) {
    if (formData.title.trim() === "") return;
    
    const newTask = {
      id: Date.now(),
      title: formData.title,
      priority: formData.priority,
      dueDate: formData.dueDate,
    };
    
    setTasks([...tasks, newTask]);
  }

  function onDeleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const value = {
    tasks,
    addTask,
    onDeleteTask
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}
```

#### Step 3: Wrap Your App with the Provider

```jsx
// App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TaskProvider } from './context/TaskProvider';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            {/* ... other routes ... */}
          </Route>
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;
```

#### Step 4: Use Context in Components

Now any component can access the data directly, **no matter how deep**:

```jsx
// HomePage.jsx - No longer needs props!
import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskList from "../components/TaskList/TaskList";
import TaskForm from "../components/TaskForm/TaskForm";

function HomePage() {
  const { addTask } = useContext(TaskContext);
  
  return (
    <>
      <h1>Hello below are your tasks:</h1>
      <TaskForm addTask={addTask}/>  
      <TaskList />
    </>
  );
}

export default HomePage;
```

```jsx
// TaskList.jsx - No longer needs to forward props!
import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskCard from '../TaskCard/TaskCard';

function TaskList() {
  const { tasks } = useContext(TaskContext);
  
  return (
    <>
      {
        tasks.map(task => (
          <TaskCard key={task.id} {...task} />
        ))
      }
    </>
  );
}

export default TaskList;
```

```jsx
// TaskCard.jsx - Gets function directly from Context!
import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Link } from "react-router-dom";

function TaskCard({id, title, dueDate, priority}) {
  const { onDeleteTask } = useContext(TaskContext);
  
  return (
    <div className="task-item">
      <h3>{title}</h3>
      <span className={`task-priority ${priority.toLowerCase()}`}>{priority}</span>
      {dueDate && <p>Due Date: {dueDate}</p>}
      <p><Link to={`/tasks/${id}`}>View Details</Link></p>
      <button onClick={() => onDeleteTask(id)}>Delete</button>
    </div>
  );
}

export default TaskCard;
```

### Before and After Comparison

**BEFORE (With Prop Drilling)**
```
App passes props → HomePage receives props → TaskList receives props → TaskCard uses them
Every component in the chain must accept and forward the props
```

**AFTER (With Context)**
```
App provides Context → TaskCard gets data directly from Context
Intermediate components (HomePage, TaskList) don't need to know about the props
```


