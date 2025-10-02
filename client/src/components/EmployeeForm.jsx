import React, { useState } from "react";
import axios from "axios";
import { addEmpDetails } from "../services/api";


function EmployeeForm({ onEmployeeAdded }) {
  const [form, setForm] = useState({ name: "", email: "", position: "" });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("position", form.position);
        if (file) {
            formData.append("resume", file);
        } else {
            setMessage("Please fill all the details")
            return
        }
        console.log("formData", formData);
        
        
        const res = await addEmpDetails(formData)

        setMessage("Employee added successfully!");
        setForm({ name: null, email: null, position: null });
        setFile(null);
        onEmployeeAdded(); // refresh list
    } catch (err) {
      console.error(err);
      setMessage("Error adding employee.");
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />{" "}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />{" "}
        <input
          type="text"
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          required
        />{" "}
        <input type="file" onChange={handleFileChange} accept="application/pdf" />{" "}
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EmployeeForm;
