import { BrowserRouter , Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { UserProfile } from "./pages/UserProfile";
import { AddUser } from "./pages/AddUser";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="/add-user" element={<AddUser />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
