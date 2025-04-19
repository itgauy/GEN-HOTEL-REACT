import React, { useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import Room_Management_Appbar from '../layouts/Appbar';
import Room_Management_Page from '../pages/MainPage';
import { RequiredAuth } from '@/lib/Auth';

// Simplified RoomAdminRoutes to return Route components without hooks
const RoomAdminRoutes = () => [
  <Route
    key="room-admin"
    path="/room-admin"
    element={
      <RequiredAuth>
        <Room_Management_Appbar />
      </RequiredAuth>
    }
  >
    <Route index element={<Room_Management_Page />} />
  </Route>
];

export default RoomAdminRoutes;