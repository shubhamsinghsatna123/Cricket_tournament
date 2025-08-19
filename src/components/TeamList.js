import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TeamList() {
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
  const mobFromStorage = localStorage.getItem("mobile");
  if (!mobFromStorage) return;

  fetch(`http://localhost:8081/team/fetchbymobile?mobile=${mobFromStorage}`)
    .then((res) => res.json())
    .then((data) => setTeams(data))
    .catch((err) => console.error("Error fetching teams:", err));
}, []); 


  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Teams</h2>

      <div className="row">
        {teams.map((team) => (
          <div className="col-md-4 mb-4" key={team.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={team.logoUrl || "https://via.placeholder.com/150"}
                className="card-img-top"
                alt={team.teamname}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{team.teamname}</h5>
                <p className="text-muted">📍 {team.city.toUpperCase()}</p>
                <p className="mb-1">👤 Captain: {team.captainName.toUpperCase()}</p>
                <p className="mb-1">📞 {team.captainPhone}</p>
                <p className="mb-1">🏆 Tournament_ID: {team.tournamentId}</p>
              </div>
              <div className="card-footer text-center">
                <button
                  className="btn btn-primary w-100"
                  onClick={() => navigate(`/manage-team/${team.id}`)}
                >
                  Manage Players
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {teams.length === 0 && (
        <p className="text-muted text-center">No teams found.</p>
      )}
    </div>
  );
}
