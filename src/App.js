import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TournamentForm from "./components/TournamentForm";
import TeamForm from "./components/TeamForm";
import PlayerForm from "./components/PlayerForm";
import MatchForm from "./components/MatchForm";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import AllTournaments from "./components/AllTournaments";
import TournamentDetails from "./components/TournamentDetails";
import TeamList from "./components/TeamList";
import ManageTeam from "./components/ManageTeam";
import CaptainManage from "./components/CaptainManage";

function App() {
  return (
    <Router>
      
      <Routes>
        {/* Protected Routes */}
        <Route path="/"  element={<Navbar />}/>
         <Route path="/my-teams" element={<TeamList />} />
         <Route path="/captainmanage" element={<CaptainManage />} />
  <Route path="/manage-team/:id" element={<ManageTeam />} />
        <Route path="/alltournament"  element={<AllTournaments />}/>
        <Route path="/tournament/:id" element={<TournamentDetails />} />
       
        <Route
          path="/tournament"
          element={
            <ProtectedRoute>
              <TournamentForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <TeamForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/player"
          element={
            <ProtectedRoute>
              <PlayerForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/match"
          element={
            <ProtectedRoute>
              <MatchForm />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
