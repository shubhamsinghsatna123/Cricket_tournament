import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function MatchForm() {
  const [formData, setFormData] = useState({
    tournamentId: "",
    teamAId: "",
    teamBId: "",
    scheduledAt: "",
    venue: "",
    status: "",
    result: ""
  });

  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/tournament/fetch")
      .then((res) => res.json())
      .then((data) => setTournaments(data))
      .catch((err) => console.error("Error fetching tournaments", err));

    fetch("http://localhost:8081/team/fetch")
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch((err) => console.error("Error fetching teams", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // If Team A is changed and Team B was the same, reset Team B
    if (name === "teamAId" && value === formData.teamBId) {
      setFormData((prev) => ({ ...prev, teamBId: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8083/match/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      alert("Match created successfully!");
      setFormData({
        tournamentId: "",
        teamAId: "",
        teamBId: "",
        scheduledAt: "",
        venue: "",
        status: "",
        result: ""
      });
    } catch (error) {
      console.error("Error creating match", error);
      alert("Error creating match");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white">
          <h4 className="mb-0">Create Match</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            
            {/* Tournament */}
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
                {tournaments.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.id} - {t.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Team A */}
            <div className="mb-3">
              <label className="form-label">Team A</label>
              <select
                name="teamAId"
                value={formData.teamAId}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">-- Select Team A --</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.id} - {team.teamname}
                  </option>
                ))}
              </select>
            </div>

            {/* Team B */}
            <div className="mb-3">
              <label className="form-label">Team B</label>
              <select
                name="teamBId"
                value={formData.teamBId}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">-- Select Team B --</option>
                {teams
                  .filter((team) => String(team.id) !== String(formData.teamAId))
                  .map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.id} - {team.teamname}
                    </option>
                  ))}
              </select>
            </div>

            {/* Scheduled At */}
            <div className="mb-3">
              <label className="form-label">Scheduled At</label>
              <input
                type="datetime-local"
                name="scheduledAt"
                value={formData.scheduledAt}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Venue */}
            <div className="mb-3">
              <label className="form-label">Venue</label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Status */}
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">-- Select Status --</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            {/* Result */}
            <div className="mb-3">
              <label className="form-label">Result</label>
              <input
                type="text"
                name="result"
                value={formData.result}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-success w-100">
              Save Match
            </button>
          </form>
        </div>
      </div>
      <br/>
      <button>
      <Link className="nav-link" to="/">Back</Link>
      </button>
    </div>
  );
}
