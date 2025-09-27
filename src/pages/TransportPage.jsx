import React from "react";
import TransportForm from "../components/TransportDashboard/TransportForm";
import TransportList from "../components/TransportDashboard/TransportList";

function TransportPage() {
  return (
    <div>
      <h2>Transport Management</h2>
      <p>Manage transports — view existing entries or add new ones.</p>
      <TransportForm />
      <TransportList />
    </div>
  );
}

export default TransportPage;