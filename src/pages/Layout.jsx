import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContextProvider";

function Layout() {
 
    const { toggleTheme, theme } = useTheme();

  return (
    <div>
      <nav>
        <Link to="/">Home|</Link>
        <Link to="/stats">Stats</Link>
        <button className="theme-button" onClick={toggleTheme}>
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; My App 2026</p>
      </footer>
    </div>
  );
}

export default Layout;
