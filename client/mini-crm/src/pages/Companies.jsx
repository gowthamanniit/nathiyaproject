import { useEffect, useState } from "react";
import API from "../utils/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Link } from "react-router-dom";
import "./Companies.css";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({
    name: "",
    industry: "",
    location: ""
  });

  const fetchCompanies = async () => {
    const res = await API.get("/companies");
    setCompanies(res.data);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/companies", form);

    setForm({
      name: "",
      industry: "",
      location: ""
    });

    fetchCompanies();
  };

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="companies-page">
        <h1>Companies</h1>

        <form
          className="company-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="industry"
            placeholder="Industry"
            value={form.industry}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <button type="submit">
            Add Company
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Industry</th>
              <th>Location</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((company) => (
              <tr key={company._id}>
                <td>
                  <Link
                    to={`/companies/${company._id}`}
                  >
                    {company.name}
                  </Link>
                </td>
                <td>{company.industry}</td>
                <td>{company.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Companies;