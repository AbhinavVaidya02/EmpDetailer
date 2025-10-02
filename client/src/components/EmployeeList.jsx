import React, { useEffect, useState } from "react";
import axios from "axios";
import { listEmpDetails } from "../services/api";


function EmployeeList({ refresh }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await listEmpDetails();
        setEmployees(res.data.result);
      } catch (err) {
        console.error("Error fetching employees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [refresh]);

  if (loading) return <p>Loading employees...</p>;
  if (employees.length === 0) return <p>No employees found.</p>;

  return (
    <div>
      <h3>Employees</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {employees.map((emp) => (
          <div
            key={emp.id}
            style={{
              border: "1px solid #ccc",
              paddingLeft: "10px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h4>{emp.name}</h4>
            <p><strong>Email:</strong> {emp.email}</p>
            <p><strong>Position:</strong> {emp.position}</p>
            {emp.actual_resume_filename && (
              <p><strong>Resume:</strong> {emp.actual_resume_filename}</p>
            )}
            {/* {emp.ref_resume_filename && (
              <p><strong>Reference Resume:</strong> {emp.ref_resume_filename}</p>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeeList;