import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { User } from "../types/User";
import { useUserContext } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";

export const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { state } = useUserContext();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const localUser = state.localUsers.find(
          (u) => u.id === parseInt(id || "")
        );
        if (localUser) {
          setUser(localUser);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, state.localUsers]);

  return (
    <div
      className={`min-h-screen p-4 pt-20 ${
        theme === "light" ? "bg-white" : "bg-blue-900 text-white"
      } transition-colors duration-300 font-[Poppins]`}
    >
      <div className="max-w-4xl mx-auto">
        {loading && (
          <div className="text-center text-sm font-normal text-black dark:text-white font-[Poppins]">
            Loading...
          </div>
        )}
        {error || !user ? (
          <div className="text-center text-orange-600 dark:text-orange-500 text-sm font-normal font-[Poppins]">
            {error || "User not found"}
          </div>
        ) : (
          <div
            className={`p-3 rounded-md ${
              theme === "light" ? "bg-gray-100" : "bg-blue-800"
            } font-[Poppins]`}
          >
            <h1 className="text-2xl font-bold mb-4 text-black dark:text-white font-[Poppins]">
              {user.name}
            </h1>
            <p className="text-sm font-normal text-black dark:text-white font-[Poppins]">
              Email: {user.email}
            </p>
            {user.phone && (
              <p className="text-sm font-normal text-black dark:text-white font-[Poppins]">
                Phone: {user.phone}
              </p>
            )}
            {user.website && (
              <p className="text-sm font-normal text-black dark:text-white font-[Poppins]">
                Website: {user.website}
              </p>
            )}
            {user.company && (
              <p className="text-sm font-normal text-black dark:text-white font-[Poppins]">
                Company: {user.company.name}
              </p>
            )}
            {user.role && (
              <p className="text-sm font-normal text-black dark:text-white font-[Poppins]">
                Role: {user.role}
              </p>
            )}
            {user.age && (
              <p className="text-sm font-normal text-black dark:text-white font-[Poppins]">
                Age: {user.age}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};