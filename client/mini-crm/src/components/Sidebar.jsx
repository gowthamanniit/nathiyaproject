import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2>MINI CRM</h2>

      <Link
        to="/dashboard"
        className={location.pathname === "/dashboard" ? "active" : ""}
      >
        Dashboard
      </Link>

      <Link
        to="/leads"
        className={location.pathname.includes("/leads") ? "active" : ""}
      >
        Leads
      </Link>

      <Link
        to="/companies"
        className={location.pathname.includes("/companies") ? "active" : ""}
      >
        Companies
      </Link>

      <Link
        to="/tasks"
        className={location.pathname.includes("/tasks") ? "active" : ""}
      >
        Tasks
      </Link>
    </div>
  );
}

export default Sidebar;