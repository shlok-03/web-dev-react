# REST API
## Delete Task & Get Task Details

**IMPORTANT:** Before starting, open a separate terminal and start the backend server:
```bash
cd backend
node app.js
```

The server will run on `http://localhost:3000`

---

## Objective
Implement delete task and get task details functionalities by making calls to the backend REST API.

---

## Part 1 - Get Task Details

Create a function to fetch a single task from the backend:

```javascript
async function getTaskDetail(taskId) {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.task;
  } catch (error) {
    console.error('Error fetching task:', error);
    return null;
  }
}
```

Test in browser console:
```javascript
const task = await getTaskDetail(1);
console.log(task);
```

**Requirements:**
- Fetch single task by ID from `GET /tasks/:id`
- Handle errors (task not found, network error)
- Return the task object

---

## Part 2 - Add Click Handler to Display Task Details

Update your `TaskCard` component:

1. Add a button or make the card clickable
2. When clicked, call `getTaskDetail()` with the task ID
3. Display the task details (title, priority, dueDate, completed status, createdAt)

**Hint:** You can display details in an alert, modal, or console for now:
```javascript
const taskDetail = await getTaskDetail(task.id);
console.log('Task Details:', taskDetail);
```

---

## Part 3 - Delete Task

Create a function to delete a task from the backend:

```javascript
async function deleteTask(taskId) {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting task:', error);
    return null;
  }
}
```

Test in browser console:
```javascript
await deleteTask(1);
```

**Requirements:**
- Send DELETE request to `/tasks/:id`
- Handle errors
- Return response data

---

## Part 4 - Add Delete Button to TaskCard

1. Add a delete button in your `TaskCard` component
2. When clicked, call `deleteTask(task.id)`
3. After successful deletion, remove the task from state

**Hint:** Update your task list state after deletion:
```javascript
setTasks(tasks.filter(t => t.id !== deletedTaskId));
```

---

## Part 5 (Optional) - Confirmation Dialog

Before deleting a task, show a confirmation:

```javascript
if (window.confirm(`Delete task: "${task.title}"?`)) {
  await deleteTask(task.id);
  // update state
}
```

**Benefits:**
- Prevents accidental deletions
- Better user experience


