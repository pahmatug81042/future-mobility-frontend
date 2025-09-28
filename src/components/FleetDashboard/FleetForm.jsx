import React, { useState, useContext } from "react";
import { apiClient } from "../../api/apiClient";
import { AuthContext } from "../../context/AuthContext"; // assuming you have an AuthContext

function FleetForm({ refreshFleets }) {
  // Get the logged-in user's ID from context
  const { user } = useContext(AuthContext);
  const ownerId = user?._id;

  const [form, setForm] = useState({
    name: "",
    ownerType: "company",
    vehicleType: "bus",
    capacity: 1,
    status: "active",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes safely
  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      // Ensure numeric fields are converted to number
      [name]: name === "capacity" ? Number(value) : value,
    });
  }

  // Submit the new fleet to API
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate required fields
    if (!form.name.trim()) {
      setError("Fleet name is required.");
      return;
    }

    if (!ownerId) {
      setError("Owner ID is missing. Please log in.");
      return;
    }

    if (
      !form.ownerType ||
      !["company", "government"].includes(form.ownerType)
    ) {
      setError("Please select a valid owner type.");
      return;
    }

    if (!form.vehicleType) {
      setError("Vehicle type is required.");
      return;
    }

    if (form.capacity < 1) {
      setError("Capacity must be at least 1.");
      return;
    }

    setLoading(true);

    try {
      await apiClient.post("/fleets", { ...form, ownerId });
      setSuccess("Fleet added successfully!");
      // Reset form
      setForm({
        name: "",
        ownerType: "company",
        vehicleType: "bus",
        capacity: 1,
        status: "active",
      });

      // Refresh the fleet list in parent
      if (refreshFleets) refreshFleets();
    } catch (err) {
      console.error("Fleet creation error:", err);
      setError(
        err?.response?.data?.message ||
          "Failed to add fleet. Please try again later."
      );
    } finally {
      setLoading(false);
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

      <select
        name="ownerType"
        value={form.ownerType}
        onChange={handleChange}
        required
      >
        <option value="company">Company</option>
        <option value="government">Government</option>
      </select>

      <select
        name="vehicleType"
        value={form.vehicleType}
        onChange={handleChange}
        required
      >
        <option value="bus">Bus</option>
        <option value="train">Train</option>
        <option value="tram">Tram</option>
        <option value="bike">Bike</option>
        <option value="scooter">Scooter</option>
        <option value="car">Car</option>
        <option value="drone">Drone</option>
        <option value="other">Other</option>
      </select>

      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        value={form.capacity}
        onChange={handleChange}
        min={1}
        required
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

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Fleet"}
      </button>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default FleetForm;