import { useState, Fragment } from 'react'
import { BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import LandingRoutes from './users/landing/routes/LandingRoutes';
import LoginRoutes from './users/credentials/Login_Routes';
import GuestUserRoute from './users/guests/routes/GuestRoute';

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
      </Routes>
    </Router>
  )
}

export default App
