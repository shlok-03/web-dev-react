# React Routing

## What is Routing?

Routing is the process of navigating between different pages or views in your application without reloading the entire page. In React, we use **React Router** to manage these navigations smoothly and create a single-page application (SPA) experience.

### Why Do We Need Routing?

- **Better User Experience**: Users can navigate smoothly without page reloads
- **Shareable URLs**: Each page has its own URL that users can bookmark or share
- **Back Button Support**: The browser's back/forward buttons work naturally
- **Organized Code**: Different views are separated into different components

## Setting Up React Router

Installation

```bash
npm intall react-router-dom
```

## Basic Routing Example

### 1. Import Required Components

```javascript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
```

- **BrowserRouter**: Wraps your entire app and enables routing
- **Routes**: Container for all your Route definitions
- **Route**: Maps a URL path to a component
- **Link**: Navigation component (replaces `<a>` tags)

### 2. Set Up Your App.jsx

```javascript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/stats">Stats</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 3. Create Your Page Components

**pages/HomePage.jsx:**
```javascript
export default function HomePage() {
  return (
    <div>
      <h1>Welcome Home!</h1>
      <p>This is the home page.</p>
    </div>
  );
}
```

**pages/StatsPage.jsx:**
```javascript
export default function StatsPage() {
  return (
    <div>
      <h1>Tasks Stats</h1>
      <p>Number of tasks:</p>
    </div>
  );
}
```

## Common Routing Patterns

### Dynamic Routes (URL Parameters)

If you need to pass data through the URL:

```javascript
<Route path="/task/:id" element={<TaskDetail />} />
```

Access the parameter in your component:

```javascript
import { useParams } from 'react-router-dom';

export default function TaskDetail() {
  const { id } = useParams();
  return <h1>Task ID: {id}</h1>;
}
```

### Navigating Programmatically

```javascript
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // ... login logic ...
    navigate('/dashboard'); // Go to dashboard after login
  };

  return (
    <button onClick={handleSubmit}>Login</button>
  );
}
```

## Nested Routes with Outlet

`Outlet` is a component that renders child routes at that specific location. It's useful when you want to have a shared layout (like a navigation sidebar or header) that stays the same while the content below changes.

### How Outlet Works

Think of `Outlet` as a placeholder that says "render the child route content here."

**App.jsx:**
```javascript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="stats" element={<StatsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

**pages/Layout.jsx:**
```javascript
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/stats">Stats</Link>
      </nav>
      
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
      
      <footer>
        <p>&copy; 2026 My App</p>
      </footer>
    </div>
  );
}
```


Now when users navigate between "/" and "/stats", the `Layout` component (with nav and footer) stays the same, and only the content inside `<Outlet />` changes!

## Wildcard Routes and 404 Pages

A **wildcard route** (using `*`) matches any URL that doesn't match other routes. This is perfect for displaying a 404 "Page Not Found" error when users visit a URL that doesn't exist.

### Why Use Wildcard Routes?

- **User-Friendly**: Instead of a blank page, show a helpful message
- **Error Handling**: Catch typos in URLs and guide users back
- **Professional Look**: A 404 page makes your app feel complete

### How It Works

The order of routes matters! React Router checks routes from top to bottom. Place the wildcard `*` route **last** so it only matches if no other routes do.

**App.jsx with 404 Page:**
```javascript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="stats" element={<StatsPage />} />
          <Route path="*" element={<NotFound />} /> {/* Wildcard - must be last! */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

**pages/NotFound.jsx:**
```javascript
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/">← Go Back Home</Link>
    </div>
  );
}
```

### Important Notes

- **Route Order**: Put the wildcard `*` route last. Routes are matched in order, so if you put it first, it will catch everything!
- **Path Syntax**: Use `*` (single asterisk) for wildcard matching
- **Nested Wildcards**: You can also use wildcards in nested routes: `<Route path="admin/*" element={<AdminLayout />}>`

## Key Takeaways

- Use `<Link>` instead of `<a>` tags for navigation
- Wrap your app with `<BrowserRouter>`
- Define routes inside `<Routes>`
- Use `useParams()` to access URL parameters
- Use `useNavigate()` for programmatic navigation
- Each route should map to a component in the `pages/` folder
- Use wildcard `*` routes for 404 pages (place them last!)
- Route order matters - routes are checked from top to bottom
