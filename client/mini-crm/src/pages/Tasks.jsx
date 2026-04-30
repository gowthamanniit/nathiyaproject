import { useEffect, useState } from "react";
import API from "../utils/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./Tasks.css";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [leads, setLeads] = useState([]);

  const [form, setForm] = useState({
    title: "",
    lead: "",
    dueDate: ""
  });

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const fetchLeads = async () => {
    const res = await API.get("/leads");
    setLeads(res.data.leads);
  };

  useEffect(() => {
    fetchTasks();
    fetchLeads();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    await API.post("/tasks", {
      ...form,
      assignedTo: user.id
    });

    setForm({
      title: "",
      lead: "",
      dueDate: ""
    });

    fetchTasks();
  };

  const updateStatus = async (id) => {
    await API.put(`/tasks/${id}/status`, {
      status: "Completed"
    });

    fetchTasks();
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="tasks-page">
        <h1>Tasks</h1>

        <form
          className="task-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <select
            name="lead"
            value={form.lead}
            onChange={handleChange}
            required
          >
            <option value="">
              Select Lead
            </option>

            {leads.map((lead) => (
              <option
                key={lead._id}
                value={lead._id}
              >
                {lead.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Add Task
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Lead</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.lead?.name}</td>
                <td>
                  {new Date(
                    task.dueDate
                  ).toLocaleDateString()}
                </td>
                <td>{task.status}</td>
                <td>
                  {task.status !==
                    "Completed" && (
                    <button
                      onClick={() =>
                        updateStatus(task._id)
                      }
                    >
                      Done
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Tasks;