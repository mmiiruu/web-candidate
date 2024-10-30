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
  const [user, setUser] = useState(null); // สถานะล็อกอินของผู้ใช้

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser); // ตั้งค่าสถานะล็อกอิน
  };

  return (
    <Router>
      <Routes>
        {/* เส้นทางไปหน้าล็อกอิน */}
        <Route
          path="/login"
          element={
            !user ? <Login onLogin={handleLogin} /> : <Navigate to="/year" />
          }
        />

        {/* เส้นทางไปหน้าเลือกปีการเลือกตั้ง */}
        <Route
          path="/year"
          element={user ? <ElectionYear /> : <Navigate to="/login" />}
        />

        {/* เส้นทางแบบไดนามิกสำหรับหน้า /year/:year */}
        <Route
          path="/year/:year"
          element={user ? <Candidate /> : <Navigate to="/login" />}
        />

        {/* เส้นทางไปหน้า Admin */}
        <Route
          path="/admin"
          element={user ? <AdminPage /> : <Navigate to="/login" />}
        />

        {/* เส้นทางเริ่มต้น */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
