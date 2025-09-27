import React, { useState, useEffect } from "react";
import { apiClient } from "../../api/apiClient";

function TransportForm() {
  const [form, setForm] = useState({
    name: "",
    type: "",
    status: "",
    capacity: 0,
    fleetId: "",
  });
  const [fleets, setFleets] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchFleets() {
      try {
        const { data } = await apiClient.get("/fleets");
        setFleets(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchFleets();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await apiClient.post("/transports", form);
      setSuccess("Transport added successfully!");
      setForm({ name: "", type: "", status: "", capacity: 0, fleetId: "" });
    } catch (err) {
      console.error(err);
      setError("Failed to add transport.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        name="name"
        placeholder="Transport Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="type"
        placeholder="Transport Type"
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
        name="capacity"
        placeholder="Capacity"
        value={form.capacity}
        onChange={handleChange}
        min="0"
        required
      />
      <select
        name="fleetId"
        value={form.fleetId}
        onChange={handleChange}
        required
      >
        <option value="">Select Fleet</option>
        {fleets.map((fleet) => (
          <option key={fleet._id} value={fleet._id}>
            {fleet.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Transport</button>
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default TransportForm;