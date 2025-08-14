import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Home from "./Home";
import "./Navbar.css"
import Footer from "./Footer";
export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [showLogoutConfirmModal, setShowLogoutConfirmModal] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedName = localStorage.getItem("name") || "";
    const storedRole = localStorage.getItem("role") || "";
    setIsLoggedIn(loggedIn);
    setUserName(storedName.toUpperCase());
    setRole(storedRole.toLowerCase());
  }, []);

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      setShowLogoutConfirmModal(true);
    } else {

      navigate("/login");
    }
  };

  const confirmLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserName("");
    setRole("");
    setShowLogoutConfirmModal(false);
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
        <div className="container-fluid">
          <span className="navbar-brand">
            {!isLoggedIn ? "Cricket App" : `Welcome, ${userName}`}
          </span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {/* Tournament Menu */}
              {/* <li className="nav-item">
                <Link className="nav-link" to="/tournament">Tournament</Link>
              </li> */}

              <li className="nav-item">
                <Link className="nav-link" to="/team">Team</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/player">Player</Link>
              </li>



              {/* Organizer Menu */}
              {role.toLowerCase() === "organizer" && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/tournament">Tournament</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/match">Match</Link>
                  </li>

                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-outline-warning me-2 my-1"
                      onClick={() => navigate("/#")}
                    >
                      Organizer Panel
                    </button>
                  </li>


                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-outline-light me-2 my-1"
                      onClick={() => navigate("/captainmanage")}
                    >
                      Captain Manage
                    </button>
                  </li>
                </>
              )}

              {/* Captain Menu */}
              {role.toLowerCase() === "captain" && (
                <>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-outline-primary me-2 my-1"
                      onClick={() => navigate("/my-teams")}
                    >
                      Manage My Team
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-outline-primary me-2 my-1"
                      onClick={() => navigate("/alltournament")}
                    >
                      View All Tournament
                    </button>
                  </li>


                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-outline-success me-2 my-1"
                      onClick={() => navigate("/#")}
                    >
                      View Matches
                    </button>
                  </li>
                </>
              )}

              {/* Login/Logout */}
              <li className="nav-item">
                <button
                  type="button"
                  className={`btn ${isLoggedIn ? "btn-danger" : "btn-outline-warning"} ms-2`}
                  onClick={handleLoginLogout}
                >
                  {isLoggedIn ? "Logout" : "Login"}
                </button>
              </li>

              {/* Register Button */}
              {!isLoggedIn && (
                <li className="nav-item">
                  <Link className="btn btn-outline-light ms-2" to="/register">
                    Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirmModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Confirm Logout</h5>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to log out?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowLogoutConfirmModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmLogout}>
                  Yes, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="dashboard-bg" style={{ paddingTop: '100px' }}>
        {/* <Home /> */}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
