"use client";
import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <DarkModeSwitch
      checked={darkMode}
      onChange={setDarkMode}
      size={30}
      moonColor="white"
      sunColor="white"
    />
  );
};

export default ThemeToggle;
