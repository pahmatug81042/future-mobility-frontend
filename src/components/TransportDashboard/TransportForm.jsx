import React, { useState, useEffect } from "react";
import { apiClient } from "../../api/apiClient";

function TransportForm({ refreshList }) {
  // Form state with defaults matching transportModel.js
  const [form, setForm] = useState({
    name: "",
    type: "bus",
    status: "active",
    capacity: 1,
    sustainabilityScore: 0,
    fleetId: "", // optional
  });

  const [fleets, setFleets] = useState([]);
  const [loadingFleets, setLoadingFleets] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch available fleets to assign
  useEffect(() => {
    async function fetchFleets() {
      setLoadingFleets(true);
      try {
        const response = await apiClient.get("/fleets");
        const fleetData = Array.isArray(response.data?.data)
          ? response.data.data
          : [];
        setFleets(fleetData);
      } catch (err) {
        console.error("Failed to fetch fleets:", err);
        setFleets([]);
      } finally {
        setLoadingFleets(false);
      }
    }
    fetchFleets();
  }, []);

  // Handle form input changes safely
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "capacity" || name === "sustainabilityScore"
          ? Number(value)
          : value,
    });
  }

  // Submit transport to backend
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!form.name || !form.type || form.capacity < 1) {
      setError("Please fill in all required fields correctly.");
      return;
    }

    try {
      // Prepare payload: remove fleetId if empty
      const payload = { ...form };
      if (!payload.fleetId) delete payload.fleetId;

      await apiClient.post("/transports", payload);

      setSuccess("Transport added successfully!");
      // Reset form to defaults
      setForm({
        name: "",
        type: "bus",
        status: "active",
        capacity: 1,
        sustainabilityScore: 0,
        fleetId: "",
      });

      // Refresh the transport list in parent component
      if (typeof refreshList === "function") refreshList();
    } catch (err) {
      console.error("Error adding transport:", err);
      setError(
        err?.response?.data?.message ||
          "Failed to add transport. Please try again."
      );
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

      <select name="type" value={form.type} onChange={handleChange} required>
        <option value="bus">Bus</option>
        <option value="train">Train</option>
        <option value="tram">Tram</option>
        <option value="bike">Bike</option>
        <option value="scooter">Scooter</option>
        <option value="car">Car</option>
        <option value="plane">Plane</option>
        <option value="drone">Drone</option>
        <option value="other">Other</option>
      </select>

      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        value={form.capacity}
        min={1}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="sustainabilityScore"
        placeholder="Sustainability Score (0-100)"
        value={form.sustainabilityScore}
        min={0}
        max={100}
        onChange={handleChange}
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        required
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="maintenance">Maintenance</option>
      </select>

      <select
        name="fleetId"
        value={form.fleetId}
        onChange={handleChange}
        disabled={loadingFleets || fleets.length === 0}
      >
        <option value="">Assign to Fleet (optional)</option>
        {fleets.map((fleet) => (
          <option key={fleet._id} value={fleet._id}>
            {fleet.name || "Unnamed Fleet"}
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