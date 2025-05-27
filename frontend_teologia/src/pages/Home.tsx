import React from "react";
import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Home: React.FC = () => (
  <div className="app-layout">
    <Navbar />
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "2rem" }}>
        <Dashboard />
      </main>
    </div>
  </div>
);

export default Home;