# Week 4 Homework  
## Topic: useEffect & localStorage



## Learning Goals:

- Strengthen your understanding of `useEffect`
- Practice working with dependency arrays
- Use `localStorage` for persistence
- Avoid common infinite loop mistakes
- Improve state management patterns

---

## Overview

**Continue working on your Smart Task Manager app.** This week, you'll enhance it with `useEffect` hooks, `localStorage` persistence, and advanced state management patterns.



## Tasks:


## 1. Add “Clear All Tasks” Button

Create a button that:

- Removes all tasks
- Updates the UI immediately
- Clears the tasks in localStorage

### Expected behavior:

- When clicked → task list becomes empty
- After refresh → tasks remain empty

Hint:
```js
setTasks([]);
```

## 2. Persist Filter Preference

If you implemented task filtering (All / Active / Completed):
- Save the selected filter to localStorage
- Load it on page refresh

Requirements:
- Filter stays selected after refresh
- Use useState with lazy initialization if possible

Example:
```js
const [filter, setFilter] = useState(() => {
  return localStorage.getItem("filter") || "all";
});
```

## 3. Add "Last Modified" Timestamp

Each time tasks change store a timestamp in state. Display it at the top of your app.

Example Display:
```
Last updated: 14:32:10
```
Hint:

```js
new Date().toLocaleTimeString();
```

## Bonus Challenge
Theme Persistence System

Add a Light/Dark mode toggle to your app.

Requirements:
- Create a theme state (light or dark)
- Add a toggle button
- Save theme to localStorage
- Load saved theme on app start
- Apply different styles depending on theme

Expected Behavior:
- Toggle changes theme instantly
- Theme persists after page refresh
- No infinite loops

Suggested Pattern:
```js
const [theme, setTheme] = useState(() => {
  return localStorage.getItem("theme") || "light";
});

useEffect(() => {
  localStorage.setItem("theme", theme);
}, [theme]);
```