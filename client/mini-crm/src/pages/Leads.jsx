import { useEffect, useState } from "react";
import API from "../utils/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Link } from "react-router-dom";
import "./Leads.css";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const fetchLeads = async () => {
    try {
      const res = await API.get(
        `/leads?search=${search}&status=${status}`
      );
      setLeads(res.data.leads);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search, status]);

  const deleteLead = async (id) => {
    await API.delete(`/leads/${id}`);
    fetchLeads();
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="leads-page">
        <h1>Leads</h1>

        <div className="lead-controls">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="">All</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>

          <Link to="/leads/add">
            <button>Add Lead</button>
          </Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.status}</td>
                <td>
                  {lead.assignedTo?.name || "N/A"}
                </td>
                <td>
                  <Link
                    to={`/leads/edit/${lead._id}`}
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      deleteLead(lead._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Leads;