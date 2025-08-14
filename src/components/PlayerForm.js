import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function PlayerForm() {
    const [formData, setFormData] = useState({
        teamId: "",
        name: "",
        role: "",
        jerseyNumber: "",
        phone: ""
    });

    const [teams, setTeams] = useState([]);

    // Fetch teams on component mount
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch("http://localhost:8081/team/fetch");
                if (!response.ok) throw new Error("Failed to fetch teams");
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                console.error("Error fetching teams", error);
            }
        };
        fetchTeams();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8082/player/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            alert("Player registered successfully!");
            setFormData({
                teamId: "",
                name: "",
                role: "",
                jerseyNumber: "",
                phone: ""
            });
        } catch (error) {
            console.error("Error creating player", error);
            alert("Error creating player");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Register Player</h2>
                <form onSubmit={handleSubmit}>

                    {/* Team Select */}
                    <div className="mb-3">
                        <label className="form-label">Team</label>
                        <select
                            name="teamId"
                            value={formData.teamId}
                            onChange={handleChange}
                            className="form-select"
                            required
                        >
                            <option value="">-- Select Team --</option>
                            {teams.map((team) => (
                                <option key={team.id} value={team.id}>
                                    {team.id} - {team.teamname}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Player Name */}
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    {/* Role */}
                    <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="">-- Select Role --</option>
                            <option value="BATSMAN">Batsman</option>
                            <option value="BOWLER">Bowler</option>
                            <option value="ALLROUNDER">All-rounder</option>
                            <option value="WICKET_KEEPER">Wicket Keeper</option>
                        </select>
                    </div>

                    {/* Jersey Number */}
                    <div className="mb-3">
                        <label className="form-label">Jersey Number</label>
                        <input
                            type="number"
                            name="jerseyNumber"
                            value={formData.jerseyNumber}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    {/* Phone */}
                    <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-warning w-100">
                        Save Player
                    </button>
                </form>
            </div>
            <br />
            <button>
                <Link className="nav-link" to="/">Back</Link>
            </button>
        </div>
    );
}
