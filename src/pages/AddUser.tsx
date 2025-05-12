import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import { useUserForm } from "../hooks/useUserForm";
import { UserRole, User, NewUserForm } from "../types/User";
import { useTheme } from "../context/ThemeContext";

export const AddUser = () => {
  const { dispatch } = useUserContext();
  const [addedUser, setAddedUser] = useState<User | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useUserForm();
  const { theme } = useTheme();

  const onSubmit = (data: NewUserForm) => {
    const newUser: User = {
      id: Date.now(),
      name: data.name,
      email: data.email,
      age: data.age, // Fixed: data.age is number from NewUserForm
      role: data.role,
    };
    dispatch({ type: "ADD_USER", payload: newUser });
    setAddedUser(newUser);
    reset();
  };

  return (
    <div
      className={`min-h-screen p-4 ${
        theme === "light" ? "bg-white" : "bg-blue-900 text-white"
      } transition-colors duration-300`}
    >
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
          Add New User
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="block text-xs font-medium mb-1 text-black dark:text-white">
              Name
            </label>
            <input
              {...register("name")}
              className={`w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                theme === "light"
                  ? "bg-white border-gray-300 text-black"
                  : "bg-blue-800 border-blue-700 text-white"
              }`}
            />
            {errors.name && (
              <p className="text-orange-600 dark:text-orange-500 text-xs mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium mb-1 text-black dark:text-white">
              Email
            </label>
            <input
              {...register("email")}
              className={`w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                theme === "light"
                  ? "bg-white border-gray-300 text-black"
                  : "bg-blue-800 border-blue-700 text-white"
              }`}
            />
            {errors.email && (
              <p className="text-orange-600 dark:text-orange-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium mb-1 text-black dark:text-white">
              Age
            </label>
            <input
              type="number"
              {...register("age", { valueAsNumber: true })}
              className={`w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                theme === "light"
                  ? "bg-white border-gray-300 text-black"
                  : "bg-blue-800 border-blue-700 text-white"
              }`}
            />
            {errors.age && (
              <p className="text-orange-600 dark:text-orange-500 text-xs mt-1">
                {errors.age.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium mb-1 text-black dark:text-white">
              Role
            </label>
            <select
              {...register("role")}
              className={`w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                theme === "light"
                  ? "bg-white border-gray-300 text-black"
                  : "bg-blue-800 border-blue-700 text-white"
              }`}
            >
              <option value={UserRole.Admin}>Admin</option>
              <option value={UserRole.Editor}>Editor</option>
              <option value={UserRole.Viewer}>Viewer</option>
            </select>
          </div>
          <button
            type="submit"
            className={`w-full p-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition`}
          >
            Add User
          </button>
        </form>
        {addedUser && (
          <div
            className={`mt-4 p-3 rounded-md ${
              theme === "light" ? "bg-gray-100" : "bg-blue-800"
            }`}
          >
            <h3 className="text-base font-semibold text-black dark:text-white">
              Added User
            </h3>
            <p className="text-sm text-black dark:text-white">
              Name: {addedUser.name}
            </p>
            <p className="text-sm text-black dark:text-white">
              Email: {addedUser.email}
            </p>
            <p className="text-sm text-black dark:text-white">
              Age: {addedUser.age}
            </p>
            <p className="text-sm text-black dark:text-white">
              Role: {addedUser.role}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};