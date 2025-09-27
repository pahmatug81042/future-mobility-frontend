import React, { useState } from "react";
import { apiClient } from "../../api/apiClient";

function FleetForm() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    status: "",
    utilization: 0,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await apiClient.post("/fleets", form);
      setSuccess("Fleet added successfully!");
      setForm({ name: "", type: "", status: "", utilization: 0 });
    } catch (err) {
      console.error(err);
      setError("Failed to add fleet.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        name="name"
        placeholder="Fleet Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="type"
        placeholder="Fleet Type"
        value={form.type}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="status"
        placeholder="Status"
        value={form.status}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="utilization"
        placeholder="Utilization %"
        value={form.utilization}
        onChange={handleChange}
        min="0"
        max="100"
        required
      />
      <button type="submit">Add Fleet</button>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default FleetForm;