import React from "react";

function AboutPage() {
  return (
    <div>
      <h1>About Future Mobility</h1>
      <p>
        <strong>Future Mobility</strong> is a full MERN stack application designed to 
        transform transportation, fleet management, and logistics. It leverages 
        <strong> MongoDB</strong>, <strong>Express.js</strong>, <strong>React</strong>, 
        and <strong>Node.js</strong> to deliver a secure, scalable, and dynamic platform.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li>User authentication with JWT for secure access</li>
        <li>Fleet and transport management with CRUD operations</li>
        <li>Logistics tracking including routes, costs, and emissions</li>
        <li>Analytics dashboards for fleet utilization and sustainability metrics</li>
        <li>Responsive frontend with light/dark mode support</li>
        <li>Seamless API integration between frontend and backend</li>
      </ul>

      <p>
        The goal of this project is to enable efficient, sustainable, and innovative 
        management of fleets, transports, and logistics while providing actionable 
        insights through analytics.
      </p>
    </div>
  );
}

export default AboutPage;