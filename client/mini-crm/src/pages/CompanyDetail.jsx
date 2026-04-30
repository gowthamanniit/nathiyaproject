import { useEffect, useState } from "react";
import API from "../utils/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useParams } from "react-router-dom";
import "./CompanyDetail.css";

function CompanyDetail() {
  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await API.get(`/companies/${id}`);

        setCompany(res.data.company);
        setLeads(res.data.leads);

      } catch (error) {
        console.log(error);
      }
    };

    fetchCompany();
  }, [id]);

  if (!company) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="company-detail-page">
        <h1>{company.name}</h1>

        <div className="company-info">
          <p>
            <strong>Industry:</strong>{" "}
            {company.industry}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {company.location}
          </p>
        </div>

        <h2>Associated Leads</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CompanyDetail;