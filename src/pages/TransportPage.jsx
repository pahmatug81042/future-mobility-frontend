import React, { useState } from "react";
import TransportForm from "../components/TransportDashboard/TransportForm";
import TransportList from "../components/TransportDashboard/TransportList";

function TransportPage() {
  // State to trigger refresh in the list
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <div>
      <h2>Transport Management</h2>
      <p>Manage transports — view existing entries or add new ones.</p>

      {/* Pass handleRefresh to form */}
      <TransportForm refreshList={handleRefresh} />

      {/* Pass refreshTrigger to list */}
      <TransportList refetchTrigger={refreshTrigger} />
    </div>
  );
}

export default TransportPage;