import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`p-4 shadow-md ${
        theme === "light" ? "bg-white" : "bg-blue-900 text-white"
      } font-[Poppins]`}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center flex-col md:flex-row gap-4">
        <h1 className="text-xl font-bold text-black dark:text-white font-[Poppins]">
          User Directory App
        </h1>
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium font-[Poppins] ${
                isActive
                  ? "text-orange-500"
                  : "text-black dark:text-white hover:text-orange-500"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/add-user"
            className={({ isActive }) =>
              `text-sm font-medium font-[Poppins] ${
                isActive
                  ? "text-orange-500"
                  : "text-black dark:text-white hover:text-orange-500"
              }`
            }
          >
            Add User
          </NavLink>
          <button
            onClick={toggleTheme}
            className="flex items-center px-3 py-1 bg-orange-500 text-white rounded-md text-sm font-medium font-[Poppins] hover:bg-orange-600 transition"
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 mr-1" />
            ) : (
              <Sun className="w-4 h-4 mr-1" />
            )}
            {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </div>
    </nav>
  );
};