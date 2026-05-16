# Homework Week 2
## Part 1 - Expand the Task List

In ```App.jsx```:
1. Move your hardcoded tasks into state:
```javascript
const [tasks, setTasks] = useState([
  { id: 1, title: "Finish homework" },
  { id: 2, title: "Go to gym" },
  { id: 3, title: "Buy groceries" }
]);
```
2. Render tasks using .map()

3. Add button next to each task that logs the task id in console
```javascript
<button onClick={() => console.log(task.id)}>
  Show ID
</button>
```
## Part 2 — Simple Add Task Button
Add a button:
```javascript
<button>Add New Task</button>
```
When clicked:
- Add a new task with title: "New Task"
- Use Date.now() as id

Hint:
```javascript
setTasks([...tasks, newTask]);
```
## Part 3 — Basic Counter Integration
At the top of the page display:
```
Total Tasks: X
```
Where X is:
```javascript
tasks.length
```
## Part 4 (Optional) Add Remove Task Button

Add a button:
```javascript
<button>Remove Last Task</button>
```
When clicked:
- Removes last task

Hint:
```javascript
setTasks(tasks.slice(0, -1));
```