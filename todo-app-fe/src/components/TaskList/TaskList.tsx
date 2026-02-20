import { useEffect, useState } from "react";
import "./TaskList.css";
import CreateTask from "../CreaetTask/CreateTask";

type Task = {
  _id?: number | string;
  title?: string;
  name?: string;
  text?: string;
  description?: string;
  completed?: boolean;
};

const TASKS_URL = "http://localhost:3000/api/tasks";

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadTasks = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) throw new Error("Utente non autenticato");

        const response = await fetch(TASKS_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Errore ${response.status}`);
        }

        const payload = await response.json();
        const list = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.tasks)
            ? payload.tasks
            : [];

        console.log("List:", list);

        if (!cancelled) {
          setTasks(list);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err instanceof Error ? err.message : "Errore sconosciuto";
          setError(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTasks();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const completeTask = async (id: string | number | undefined) => {
    if (!id) return;

    const token = localStorage.getItem("token");
    if (!token) throw new Error("Utente non autenticato");

    try {
      const response = await fetch(`${TASKS_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          completed: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Errore ${response.status}`);
      }

      setTasks((prev) =>
        prev.map((task) =>
          task._id === id ? { ...task, completed: true } : task,
        ),
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : "Errore sconosciuto";
      setError(message);
    }
  };

  if (loading) return <p className="tasks-message">Caricamento...</p>;
  if (error) return <p className="tasks-message">Errore: {error}</p>;

  return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h1>Le mie Task</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Crea Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="tasks-message">Nessuna task trovata.</p>
      ) : (
        <ul className="tasks-list">
          {tasks.map((task, index) => {
            const title =
              task.title ?? task.name ?? task.text ?? `Task ${index + 1}`;

            return (
              <li className="tasks-item" key={task._id ?? `${title}-${index}`}>
                <div>
                  <strong>{title}</strong>
                  {task.description && <p>{task.description}</p>}
                </div>
                <div>
                  {task.completed ? (
                    <span className="tasks-completed">Completata</span>
                  ) : (
                    <span
                      className="tasks-pending"
                      onClick={() => completeTask(task._id)}
                    >
                      In sospeso
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {showModal && (
        <CreateTask
          onClose={() => setShowModal(false)}
          onTaskCreated={handleTaskCreated}
        />
      )}
    </div>
  );
}

export default TaskList;
