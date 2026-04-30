import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import AddEditLead from "./pages/AddEditLead";
import Companies from "./pages/Companies";
import CompanyDetail from "./pages/CompanyDetail";
import Tasks from "./pages/Tasks";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <Leads />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/add"
          element={
            <ProtectedRoute>
              <AddEditLead />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/edit/:id"
          element={
            <ProtectedRoute>
              <AddEditLead />
            </ProtectedRoute>
          }
        />

        <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/companies/:id"
          element={
            <ProtectedRoute>
              <CompanyDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;