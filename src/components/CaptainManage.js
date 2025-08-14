import React, { useEffect, useState, useCallback } from "react";

export default function CaptainManage() {
  const [captains, setCaptains] = useState([]);

  // Fetch all captains
  const fetchCaptains = useCallback(() => {
    fetch(`http://localhost:9090/user/captain`)
      .then((res) => res.json())
      .then((data) => setCaptains(data))
      .catch((err) => console.error("Error fetching captains:", err));
  }, []);

  useEffect(() => {
    fetchCaptains();
  }, [fetchCaptains]);

  // Delete captain by mobile number
  const deleteCaptain = (mobile) => {
    if (window.confirm("Are you sure you want to delete this captain?")) {
      fetch(`http://localhost:8081/team/delete?mobile=${mobile}`, { // ✅ Correct query param
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            alert("Captain deleted successfully!");
            fetchCaptains();
          } else {
            alert("Failed to delete captain.");
          }
        })
        .catch((err) => console.error("Error deleting captain:", err));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Captain Manage</h2>

      <div className="row">
        {captains.map((captain) => (
          <div className="col-md-4 mb-4" key={captain.mobile}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">{captain.name}</h5>
                <p className="text-muted">📧 {captain.email}</p>
                <p>📞 {captain.mobile}</p>
                <p>🎯 Role: {captain.role}</p>
              </div>
              <div className="card-footer d-flex justify-content-end">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteCaptain(captain.mobile)} // ✅ Uses mobile
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {captains.length === 0 && (
        <p className="text-center text-muted">No captains found.</p>
      )}
    </div>
  );
}
