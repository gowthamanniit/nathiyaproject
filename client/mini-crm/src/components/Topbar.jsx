import "./Topbar.css";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="topbar">
      <span>{user?.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Topbar;