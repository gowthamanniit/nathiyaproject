import { useEffect, useState } from "react";
import API from "../utils/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    qualifiedLeads: 0,
    tasksDueToday: 0,
    completedTasks: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/tasks/dashboard/stats");
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="dashboard">
        <h1>Dashboard</h1>

        <div className="cards">

          <div className="card">
            <h3>Total Leads</h3>
            <p>{stats.totalLeads}</p>
          </div>

          <div className="card">
            <h3>Qualified Leads</h3>
            <p>{stats.qualifiedLeads}</p>
          </div>

          <div className="card">
            <h3>Tasks Due Today</h3>
            <p>{stats.tasksDueToday}</p>
          </div>

          <div className="card">
            <h3>Completed Tasks</h3>
            <p>{stats.completedTasks}</p>
          </div>

        </div>
      </div>
    </>
  );
}

export default Dashboard;