import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { User } from "../types/User";
import { useUserContext } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const { state } = useUserContext();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = [...users, ...state.localUsers].filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen p-4 ${
        theme === "light" ? "bg-white" : "bg-blue-900 text-white"
      } transition-colors duration-300`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            User Directory
          </h1>
          <button
            onClick={toggleTheme}
            className={`flex items-center px-3 py-1 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition`}
          >
            {theme === "light" ? (
              <Moon className="w-4 h-4 mr-1" />
            ) : (
              <Sun className="w-4 h-4 mr-1" />
            )}
            {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`w-full p-2 mb-4 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${
            theme === "light"
              ? "bg-white border-gray-300 text-black"
              : "bg-blue-800 border-blue-700 text-white"
          }`}
        />
        {loading && (
          <div className="text-center text-sm text-black dark:text-white">
            Loading...
          </div>
        )}
        {error && (
          <div className="text-center text-orange-600 dark:text-orange-500 text-sm">
            {error}
          </div>
        )}
        {!loading && !error && (
          <ul className="grid gap-3 md:grid-cols-2">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className={`p-3 rounded-md ${
                  theme === "light" ? "bg-gray-100" : "bg-blue-800"
                }`}
              >
                <h3 className="text-base font-semibold text-black dark:text-white">
                  {user.name}
                </h3>
                <p className="text-sm text-black dark:text-white">
                  {user.email}
                </p>
                <Link to={`/users/${user.id}`}>
                  <button
                    className={`mt-2 px-3 py-1 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition`}
                  >
                    View Profile
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};