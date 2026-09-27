"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") || "dark";
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
    setReady(true);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";

    setTheme(next);
    localStorage.setItem("portfolio-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  }

  if (!ready) return null;

  return (
    <button
      type="button"
      className="themeToggle"
      onClick={toggleTheme}
      aria-label="Cambiar tema"
    >
      <span className="themeToggleIcon">
        {theme === "dark" ? "☀" : "☾"}
      </span>

      <span>
        {theme === "dark" ? "Claro" : "Oscuro"}
      </span>
    </button>
  );
}