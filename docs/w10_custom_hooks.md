# React Hooks

## What Are Hooks?

"In software development, a hook is a specific place in a program's code that allows you to "tap in" and execute custom logic. It provides a way to intercept function calls, events, or messages to change how an application behaves without necessarily modifying its original source code.
Think of it as a pre-defined "socket" in a wall: the main software provides the electricity (the core process), and you plug in your own appliance (your custom code) to do something specific at that exact spot."


Hooks are special React functions that let components:
- store state
- run side effects
- use context
- reuse logic

Examples:
- `useState`
- `useEffect`
- `useContext`
- `useMemo`
- `useCallback`

## Hook Rules
### 1. Hooks Must Be Called at the Top Level

❌ Wrong

```jsx
function App() {
  if (loggedIn) {
    useState(0);
  }
}
```


✅ Correct

```jsx
function App() {
  const [count, setCount] = useState(0);

  return <h1>{count}</h1>;
}
```

### 2. Never Call Hooks Inside Loops or Conditions

❌ Wrong

```jsx

if (darkMode) {
  useEffect(() => {});
}
```


✅ Correct

```jsx
useEffect(() => {
  if (darkMode) {
    // logic here
  }
}, [darkMode]);
```

### 3. Hooks Can Only Be Used:

- Inside React components
- Inside custom hooks

❌ Wrong

```jsx

function helper() {
  useState([]);
}
```


✅ Correct

```jsx
function TaskList() {
  const [tasks, setTasks] = useState([]);

  retrun (<></>);
}


function useTasks() {
  const [tasks, setTasks] = useState([]);
}
```

## Why Hooks Must Be Called at the Top Level

React uses **hook call order** to track state. Every time your component renders, React matches hook calls to their stored state by counting them in sequence: "first `useState` is this state, second `useState` is that state," and so on.

If hooks are called conditionally or in loops, **the order changes between renders**, breaking React's internal tracking system.

### How Hook Tracking Works

React stores an invisible queue of hooks for each component:

**Render 1:**
```
Render Component → Hook #1 → Hook #2 → Hook #3 → Store in queue
```

**Render 2:**
```
Render Component → Hook #1 → Hook #2 → Hook #3 → Match to stored queue
```

If the order differs, React matches the wrong state to the wrong hook.

### Why Conditionals Break Hooks

```jsx
function App({ loggedIn }) {
  if (loggedIn) {
    const [user, setUser] = useState(null);  // ❌ Hook #1 (sometimes)
  }
  
  const [theme, setTheme] = useState('light');  // Hook #1 or #2?
}
```

**Render when `loggedIn = true`:**
- Hook #1: `useState(null)` for user
- Hook #2: `useState('light')` for theme

**Render when `loggedIn = false`:**
- Hook #1: `useState('light')` for theme ← React expected Hook #1 to be user state!
- **State gets mixed up** → theme now holds old user data

### Why Loops Break Hooks

```jsx
function App({ count }) {
  for (let i = 0; i < count; i++) {
    useState(0);  // Variable number of hooks!
  }
}
```

**Render when `count = 3`:** Creates 3 hooks
**Render when `count = 2`:** Creates only 2 hooks
React can't match hooks to their state when the count changes.

### The Solution: Move Logic Inside Hooks

Always call hooks unconditionally at the top level. Move conditional logic **inside** the hook:

```jsx
✅ Correct

function App({ loggedIn }) {
  const [user, setUser] = useState(null);     // Always Hook #1
  const [theme, setTheme] = useState('light'); // Always Hook #2
  
  useEffect(() => {
    if (loggedIn) {  // Condition is INSIDE the hook
      // fetch user data
    }
  }, [loggedIn]);
}
```

**Result:** Hooks always run in the same order. React's tracking system works perfectly.

## Why Create Custom Hooks?

Custom hooks let you **extract and reuse component logic**. Instead of duplicating the same state and side effect logic across multiple components, you write a hook once and use it everywhere.

**Benefits:**

- **DRY (Don't Repeat Yourself)** — Write logic once, use it in many components
- **Cleaner components** — Extract complex logic into focused, reusable hooks
- **Easier testing** — Test hook logic independently
- **Better organization** — Separate concerns into logical units
- **Logic sharing** — Share state logic without changing component hierarchy

**Example scenario:**

If three different components need to fetch data from an API and handle loading/error states, instead of copying the same `useEffect` and state logic into each component, you'd create a `useFetch()` custom hook.

## How to Create a Custom Hook

A custom hook is simply a **JavaScript function** that:
1. Starts with the word `use` (e.g., `useCounter`, `useFetch`)
2. Uses other hooks internally
3. Returns state or functions that components can use

**Basic structure:**

```jsx
function useCustomHook() {
  // Use other hooks here
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effect logic
  }, [dependencies]);
  
  // Return what the component needs
  return { state, setState };
}
```

### Example: `useCounter` Hook

```jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}
```

**Usage:**

```jsx
function Counter() {
  const { count, increment, decrement, reset } = useCounter(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Example: `useFetch` Hook (Real-world)

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading, error };
}
```

**Usage:**

```jsx
function UserProfile() {
  const { data: user, loading, error } = useFetch('/api/user/1');
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return <h1>{user.name}</h1>;
}
```

### Example: `useLocalStorage` Hook

```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  
  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  
  return [storedValue, setValue];
}
```

**Usage:**

```jsx
function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

## Best Practices

- **Name with `use` prefix** — Signals to React that it's a hook
- **Keep hooks focused** — One hook, one responsibility
- **Document dependencies** — List all external values in the dependency array
- **Return predictable values** — Consistent return format makes it easier to use
- **Test independently** — Write tests for hook logic separately from components


