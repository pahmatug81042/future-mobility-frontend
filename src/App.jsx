import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import FleetPage from "./pages/FleetPage";
import TransportPage from "./pages/TransportPage";
import LogisticsPage from "./pages/LogisticsPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  return (
    <div>
      <header>
        <h1>Future Mobility Dashboard</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/fleets">Fleets</Link>
          <Link to="/transports">Transports</Link>
          <Link to="/logistics">Logistics</Link>
          <Link to="/analytics">Analytics</Link>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fleets" element={<FleetPage />} />
          <Route path="/transports" element={<TransportPage />} />
          <Route path="/logistics" element={<LogisticsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;