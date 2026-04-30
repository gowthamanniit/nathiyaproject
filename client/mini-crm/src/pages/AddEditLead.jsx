import { useEffect, useState } from "react";
import API from "../utils/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useNavigate, useParams } from "react-router-dom";
import "./AddEditLead.css";

function AddEditLead() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
    company: ""
  });

  const [companies, setCompanies] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchCompanies();

    if (id) {
      fetchLead();
    }
  }, []);

  const fetchCompanies = async () => {
    const res = await API.get("/companies");
    setCompanies(res.data);
  };

  const fetchLead = async () => {
    const res = await API.get(`/leads`);
    const lead = res.data.leads.find(
      (item) => item._id === id
    );

    if (lead) {
      setForm({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        status: lead.status,
        company: lead.company?._id || ""
      });
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await API.put(`/leads/${id}`, form);
    } else {
      await API.post("/leads", form);
    }

    navigate("/leads");
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="lead-form-page">
        <form
          className="lead-form"
          onSubmit={handleSubmit}
        >
          <h2>
            {id ? "Edit Lead" : "Add Lead"}
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="Contacted">
              Contacted
            </option>
            <option value="Qualified">
              Qualified
            </option>
            <option value="Lost">Lost</option>
          </select>

          <select
            name="company"
            value={form.company}
            onChange={handleChange}
          >
            <option value="">
              Select Company
            </option>

            {companies.map((company) => (
              <option
                key={company._id}
                value={company._id}
              >
                {company.name}
              </option>
            ))}
          </select>

          <button type="submit">
            Save
          </button>
        </form>
      </div>
    </>
  );
}

export default AddEditLead;