import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const TournamentDetails = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/tournament/fetch/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tournament details");
        return res.json();
      })
      .then((data) => {
        setTournament(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center my-5">Loading...</div>;
  if (!tournament) return <div className="text-center">Tournament not found</div>;

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 p-4">
        {/* Header Section */}
        <div className="text-center mb-4">
          <h2 className="mb-3">{tournament.tournamentsname}</h2>
          {tournament.logoUrl && (
            <img
              src={tournament.logoUrl}
              alt={tournament.tournamentsname}
              className="img-fluid rounded"
              style={{ maxWidth: "250px", border: "2px solid #ddd" }}
            />
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <h5 className="text-primary">Description</h5>
          <p>{tournament.description}</p>
        </div>

        {/* Location & Dates */}
        <div className="mb-4">
          <h5 className="text-primary">Location & Dates</h5>
          <p><strong>City:</strong> {tournament.city}</p>
          <p><strong>Start Date:</strong> {tournament.startDate}</p>
          <p><strong>End Date:</strong> {tournament.endDate}</p>
        </div>

        {/* Organizer Details */}
        <div className="mb-4">
          <h5 className="text-primary">Organizer Details</h5>
          <p><strong>Name:</strong> {tournament.organizerName || "N/A"}</p>
          <p><strong>Phone:</strong> {tournament.organizerPhone || "N/A"}</p>
        </div>

        {/* Extra Info */}
        <div className="mb-4">
          <h5 className="text-primary">Other Information</h5>
          <p><strong>Created At:</strong> {new Date(tournament.createdAt).toLocaleString()}</p>
        </div>

        {/* Back Button */}
        <div className="text-end">
          <Link to="/alltournament" className="btn btn-secondary">
            Back to All Tournaments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
