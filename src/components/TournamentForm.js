import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TournamentForm() {
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({
    tournamentsname: "",
    description: "",
    logoUrl: "",
    city: "",
    startDate: "",
    endDate: "",
    organizerName: "",
    organizerPhone: "",
    userEmail: "",
    userMobile: ""
  });

  useEffect(() => {
    // Fetch logged-in user details from localStorage
    const email = localStorage.getItem("email") || "";
    const mobile = localStorage.getItem("mobile") || "";
    const name = localStorage.getItem("name") || "";
    
    setFormData((prev) => ({
      ...prev,
      organizerName: name,
      organizerPhone: mobile,
      userEmail: email,
      userMobile: mobile
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tournamentData = {
      ...formData,
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch("http://localhost:8080/tournament/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tournamentData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Tournament created successfully!");
      setFormData({
        tournamentsname: "",
        description: "",
        logoUrl: "",
        city: "",
        startDate: "",
        endDate: "",
        organizerName: localStorage.getItem("name") || "",
        organizerPhone: localStorage.getItem("mobile") || "",
        userEmail: localStorage.getItem("email") || "",
        userMobile: localStorage.getItem("mobile") || ""
      });
    } catch (error) {
      console.error("Error creating tournament", error);
      alert("Error creating tournament");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Create Tournament</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Tournament Name */}
            <div className="mb-3">
              <label className="form-label">Tournament Name</label>
              <input
                type="text"
                name="tournamentsname"
                value={formData.tournamentsname}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
              ></textarea>
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

            {/* Start Date */}
            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="form-control"
                min={today} // Prevent past dates
              />
            </div>

            {/* End Date */}
            <div className="mb-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="form-control"
                min={formData.startDate || today} // End date can't be before start date
              />
            </div>


            {/* Organizer Name */}
            <div className="mb-3">
              <label className="form-label">Organizer Name</label>
              <input
                type="text"
                name="organizerName"
                value={formData.organizerName}
                onChange={handleChange}
                className="form-control"
                readOnly
              />
            </div>

            {/* Organizer Phone */}
            <div className="mb-3">
              <label className="form-label">Organizer Phone</label>
              <input
                type="text"
                name="organizerPhone"
                value={formData.organizerPhone}
                onChange={handleChange}
                className="form-control"
                readOnly
              />
            </div>

            {/* User Email */}
            <div className="mb-3">
              <label className="form-label">User Email</label>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                className="form-control"
                readOnly
              />
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-100">
              Save Tournament
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
