import { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LandingRoutes from './users/landing/routes/LandingRoutes';
import LoginRoutes from './users/credentials/routes/Login_Routes';
import GuestUserRoute from './users/guests/routes/GuestRoute';
import RoomAdminRoutes from './users/administrators/room_management/routes/RoomAdmin';
import ReservationAdminRoutes from './users/administrators/booking_reservations/routes/ReservationAdmin';
import KnowledgeAdminRoutes from './users/administrators/knowledge/routes/KnowledgeAdmin';
import BookingAssistanceRoutes from './users/administrators/booking_assistance/routes/AssistanceAdmin';
import OverAllAdminRoutes from './users/administrators/overall/routes/OverAllAdmin';

const pageTitles = {
  "/": "Hotels & Condominiums Just for You!",
  "/login": "SBIT-3O | Login",
  "/room-admin": "Room Management | SBIT-3O | Administrator",
  "/kms-admin": "Knowledge Management | SBIT-3O | Administrator",
  "/reservations-admin": "Reservations | SBIT-3O | Administrator",
  "/assistance-admin": "Assistance Inquiries | SBIT-3O | Administrator",
  "/unauthorized": "SBIT-3O | Access Denied",
};

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    document.title = pageTitles[location.pathname] || "Hotels & Condominiums Just for You!";
  }, [location.pathname]);

  return null;
}

function App() {

  return (
    <Router>
      <TitleUpdater />
      <Routes>
        {LandingRoutes()}
        {LoginRoutes()}
        {GuestUserRoute()}
        {RoomAdminRoutes()}
        {ReservationAdminRoutes()}
        {KnowledgeAdminRoutes()}
        {BookingAssistanceRoutes()}
        {OverAllAdminRoutes()}
      </Routes>
    </Router>
  );
}

export default App;
  