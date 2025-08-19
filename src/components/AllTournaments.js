import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/tournament/fetch")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch tournaments");
        return response.json();
      })
      .then((data) => {
        setTournaments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center my-5">Loading tournaments...</div>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">All Tournaments</h2>
      <div className="row">
        {tournaments.length > 0 ? (
          tournaments.map((tournament) => (
            <div key={tournament.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                {tournament.logoUrl && (
                  <img
                    src={tournament.logoUrl}
                    alt={tournament.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{tournament.name}</h5>
                  <p className="card-text">
                    <strong>Tournament_Id:</strong> {tournament.id} <br />
                    <strong>Location:</strong> {tournament.city} <br />                    
                    <strong>Start Date:</strong> {tournament.startDate} <br />
                    <strong>End Date:</strong> {tournament.endDate}
                  </p>
                  <Link
                    to={`/tournament/${tournament.id}`}
                    className="btn btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">No tournaments found</div>
        )}
      </div>
    </div>
  );
};

export default AllTournaments;
