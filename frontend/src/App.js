import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Layout/Navbar"; 
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import KanbanBoard from "./components/Board/KanbanBoard";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar /> 
      <Routes>
        <Route
          path="/"
          element={!user ? <Login /> : <Navigate to="/board" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/board" />}
        />
        <Route
          path="/board"
          element={user ? <KanbanBoard /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
};

export default App;
