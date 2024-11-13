import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import ElectionYear from "./ElectionYear";
import Candidate from "./Candidate";
import AdminPage from "./AdminPage";

function App() {
  const [user, setUser] = useState(null); 

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser); 
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !user ? <Login onLogin={handleLogin} /> : <Navigate to="/year" />
          }
        />
        <Route
          path="/year"
          element={user ? <ElectionYear /> : <Navigate to="/login" />}
        />

        <Route
          path="/year/:year"
          element={user ? <Candidate /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin"
          element={user ? <AdminPage /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
