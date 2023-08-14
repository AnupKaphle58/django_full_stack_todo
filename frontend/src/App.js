import "./App.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import TodoList from "./pages/TodoList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { UserContext, UserProvider } from "./hooks/UserContext";
import useFindUser from "./hooks/useFindUser";

function App() {
  const { user, setUser, isLoading } = useFindUser();

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Private Route */}
            {user ? (
              <Route path="/" element={<TodoList />} />
            ) : (
              <Route path="/" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
