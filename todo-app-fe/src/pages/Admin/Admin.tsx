import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ADMIN_TASKS_URL, ADMIN_USERS_URL } from "../../lib/api";
import "./Admin.css";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const fetchUsers = async () => {
    const res = await fetch(ADMIN_USERS_URL, { headers });
    const data = await res.json();
    setUsers(data.users);
  };

  const fetchTasks = async () => {
    const res = await fetch(ADMIN_TASKS_URL, { headers });
    const data = await res.json();
    setTasks(data.tasks);
  };

  const deleteUser = async (id: string) => {
    await fetch(`${ADMIN_USERS_URL}/${id}`, { method: "DELETE", headers });
    fetchUsers();
  };

  const deleteTask = async (id: string) => {
    await fetch(`${ADMIN_TASKS_URL}/${id}`, { method: "DELETE", headers });
    fetchTasks();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1 className="admin-title">Pannello Admin</h1>
        <button className="admin-logout" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="admin-content">
        <section className="admin-section">
          <h2>Utenti</h2>
          <div className="admin-table">
            {users.map((user: any) => (
              <div key={user._id} className="admin-row">
                <span>{user.username}</span>
                <span>{user.email}</span>
                <span>{user.role}</span>
                <button
                  className="admin-delete"
                  onClick={() => deleteUser(user._id)}
                >
                  Elimina
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-section">
          <h2>Tasks</h2>
          <div className="admin-table">
            {tasks.map((task: any) => (
              <div key={task._id} className="admin-row">
                <span>{task.title}</span>
                <button
                  className="admin-delete"
                  onClick={() => deleteTask(task._id)}
                >
                  Elimina
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
