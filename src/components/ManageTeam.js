import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ManageTeam() {
  const { id } = useParams(); // team ID from URL
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8082/player/fetchByTeamId/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching players:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manage Players for Team #{id}</h2>

      <div className="mb-3">
        <Link to={`/player`} className="btn btn-success">
          ➕ Add New Player
        </Link>
      </div>

      {players.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Player ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Jersey No</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.id}>
                  <td>{player.id}</td>
                  <td>{player.name}</td>
                  <td>{player.role}</td>
                  <td>{player.jerseyNumber}</td>
                  <td>{player.phone}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2">
                      ✏ Edit
                    </button>
                    <button className="btn btn-danger btn-sm">
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-muted">No players found for this team.</p>
      )}

      <div className="mt-3">
        <Link to="/" className="btn btn-secondary">
          ⬅ Back to My Teams
        </Link>
      </div>
    </div>
  );
}
