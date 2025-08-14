import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function TeamForm() {
  const role = localStorage.getItem("role"); // CAPTAIN / ORGANIZER
  const storedName = localStorage.getItem("name") || "";
  const storedPhone = localStorage.getItem("mobile") || "";

  const [formData, setFormData] = useState({
    tournamentId: "",
    teamname: "",
    logoUrl: "",
    city: "",
    captainName: role === "CAPTAIN" ? storedName : "",
    captainPhone: role === "CAPTAIN" ? storedPhone : ""
  });

  const [tournaments, setTournaments] = useState([]);

  // Fetch tournaments list
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await fetch("http://localhost:8080/tournament/fetch");
        if (!response.ok) throw new Error("Failed to fetch tournaments");
        const data = await response.json();
        setTournaments(data);
      } catch (error) {
        console.error("Error fetching tournaments", error);
      }
    };
    fetchTournaments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch("http://localhost:8081/team/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      alert("Team created successfully!");
      setFormData({
        tournamentId: "",
        teamname: "",
        logoUrl: "",
        city: "",
        captainName: role === "CAPTAIN" ? storedName : "",
        captainPhone: role === "CAPTAIN" ? storedPhone : ""
      });
    } catch (error) {
      console.error("Error creating team", error);
      alert("Error creating team");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Register Team</h2>
        <form onSubmit={handleSubmit}>
          {/* Tournament Select */}
          <div className="mb-3">
            <label className="form-label">Tournament</label>
            <select
              name="tournamentId"
              value={formData.tournamentId}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">-- Select Tournament --</option>
              {tournaments.map((tournament) => (
                <option key={tournament.id} value={tournament.id}>
                  {tournament.id} - {tournament.tournamentsname}
                </option>
              ))}
            </select>
          </div>

          {/* Team Name */}
          <div className="mb-3">
            <label className="form-label">Team Name</label>
            <input
              type="text"
              name="teamname"
              value={formData.teamname}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          {/* Logo URL */}
          <div className="mb-3">
            <label className="form-label">Logo URL</label>
            <input
              type="text"
              name="logoUrl"
              value={formData.logoUrl}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* City */}
          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          {/* Captain Name */}
          <div className="mb-3">
            <label className="form-label">Captain Name</label>
            <input
              type="text"
              name="captainName"
              value={formData.captainName}
              onChange={handleChange}
              className="form-control"
              readOnly={role === "CAPTAIN"} // Only read-only for captains
            />
          </div>

          {/* Captain Phone */}
          <div className="mb-3">
            <label className="form-label">Captain Phone</label>
            <input
              type="text"
              name="captainPhone"
              value={formData.captainPhone}
              onChange={handleChange}
              className="form-control"
              readOnly={role === "CAPTAIN"} // Only read-only for captains
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Save Team
          </button>
        </form>
      </div>
      <br />
      <button className="btn btn-secondary">
        <Link className="nav-link" to="/">
          Back
        </Link>
      </button>
    </div>
  );
}
