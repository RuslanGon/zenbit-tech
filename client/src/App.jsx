import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* Позже добавим /applications */}
    </Routes>
  );
}

export default App;
