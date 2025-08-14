import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    name: "",
    mobile: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Register data:", formData);

    try {
      const response = await fetch("http://localhost:9090/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("User registered successfully!");
      setFormData({
        email: "",
        password: "",
        role: "",
        name: "",
        mobile: ""
      });
    } catch (error) {
      console.error("Error registering user", error);
      alert("Error registering user");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Register</h3>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Mobile */}
            <div className="mb-3">
              <label className="form-label">Mobile</label>
              <input
                type="tel"
                className="form-control"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter your mobile number"
                pattern="[0-9]{10}"
                required
              />
            </div>

            {/* Role */}
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Role --</option>
                {/* <option value="ADMIN">Admin</option> */}
                <option value="ORGANIZER">Organizer</option>
                <option value="Captain">Team Captain</option>
              </select>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
