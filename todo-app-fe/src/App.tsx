import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Tasks from "./pages/Tasks/Tasks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
