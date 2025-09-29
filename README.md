# Future Mobility Manager

## Elevator Pitch
Manage and optimize fleets and transports globally with a full-stack, MERN-based management system.

---

## Link to Backend GitHub Repository
https://github.com/pahmatug81042/future-mobility-backend

---

## About This Project
Future Mobility Manager is a web application designed to help organizations track, manage, and analyze fleets and transportation assets. The platform supports fleet creation, transport assignments, and live utilization analytics to optimize resources and sustainability.

---

## Built With
- **Frontend:** React, React Router, React Context API, Chart.js, Axios, CSS Modules  
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT Authentication  
- **APIs & Libraries:** Axios, sanitize-html, express-async-handler, bcryptjs  
- **Cloud & Platforms:** MongoDB Atlas, Render (for deployment)  

---

## Inspiration
Efficient transportation and fleet management are critical for sustainable urban development. This project was inspired by the need for real-time tracking and intelligent analytics in modern mobility solutions.

---

## What It Does
- User authentication and role-based access  
- Create, read, update, and delete fleets and transports  
- Assign transports to fleets and manage their statuses  
- Visualize fleet utilization with live charts  
- Paginated and filtered fleet and transport views  

---

## How I Built It
- **Backend:** Developed RESTful APIs with Node.js, Express, and MongoDB; added validation and sanitization for all routes  
- **Frontend:** Built with React, using Context API for global state, Axios for API calls, and Chart.js for visual analytics  
- **Deployment:** Backend deployed on Render, frontend on Vercel or similar hosting  
- **Authentication:** Implemented JWT-based authentication with protected routes  

---

## Challenges I Ran Into
- Ensuring data consistency between frontend and backend  
- Safely handling optional or malformed data from APIs  
- Implementing live refresh mechanisms for fleet and transport lists  
- Integrating charts that update dynamically with backend data  

---

## Accomplishments I am Proud Of
- Fully functional, secure, and scalable MERN stack application  
- Real-time fleet and transport management with robust error handling  
- Interactive analytics dashboard with live updates  
- Clean code structure and reusable components  

---

## What I Learned
- Best practices for state management with React Context API  
- Handling complex forms and validation in React  
- Building secure RESTful APIs with Node.js and Express  
- Integrating charting libraries like Chart.js with dynamic data  

---

## What's Next for Future Mobility Manager
- Add user roles and permissions for advanced access control  
- Implement real-time notifications for fleet status updates  
- Enhance analytics with predictive maintenance and sustainability metrics  
- Mobile-friendly responsive design for fleet managers on-the-go  

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)  
- npm
- MongoDB Atlas account for database  

### Frontend Setup
```bash
git clone https://github.com/pahmatug81042/future-mobility-frontend.git
cd future-mobility-frontend
npm install
# Add your MongoDB URI and JWT secret in .env for the backend
npm run dev
```

Create a .env file inside future-mobility-frontend/ with the following values:
  ```bash
  VITE_API_URL=http://localhost:5000/api
  ```

The frontend will run locally at http://localhost:5173 (Vite default) and communicate with the backend API.