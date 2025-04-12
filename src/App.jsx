import { useState, Fragment } from 'react'
import { BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import LandingRoutes from './users/landing/routes/LandingRoutes';
import LoginRoutes from './users/credentials/Login_Routes';
import GuestUserRoute from './users/guests/routes/GuestRoute';
import RoomAdminRoutes from './users/administrators/room_management/routes/RoomAdmin';
import ReservationAdminRoutes from './users/administrators/booking_reservations/routes/ReservationAdmin';
import KnowledgeAdminRoutes from './users/administrators/knowledge/routes/KnowledgeAdmin';
import BookingAssistanceRoutes from './users/administrators/booking_assistance/routes/AssistanceAdmin';

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    document.title = pageTitles[location.pathname] || "StaySuite | Hotels & Condominiums Just for You!";
    document.body.className = pageStyles[location.pathname] || "bg-white";
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <Router>
      {/* <TitleUpdater /> */}
      <Routes>
        {...LandingRoutes()}
        {...LoginRoutes()}
        {...GuestUserRoute()}
        {...RoomAdminRoutes()}
        {...ReservationAdminRoutes()}
        {...KnowledgeAdminRoutes()}
        {...BookingAssistanceRoutes()}
      </Routes>
    </Router>
  )
}

export default App
