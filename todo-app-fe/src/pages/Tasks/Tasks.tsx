import { useNavigate } from "react-router";
import TaskList from "../../components/TaskList/TaskList";
import "./Tasks.css";

export default function Tasks() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="tasks-page">
      <header className="tasks-header">
        <h1 className="tasks-title">Le tue task</h1>
        <button className="tasks-logout" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <main className="tasks-content">
        <div className="tasks-card">
          <TaskList />
        </div>
      </main>
    </div>
  );
}
