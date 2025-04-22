import React from 'react'
import { Route } from 'react-router-dom';
import Booking_Reservation_Appbar from '../layouts/Appbar';
import Booking_Reservation_Page from '../pages/MainPage';
import { RequiredAuth } from '@/lib/Auth';

const ReservationAdminRoutes = () => [
  <Route
    key="reservations-admin"
    path="/reservations-admin"
    element={
      <RequiredAuth>
        <Booking_Reservation_Appbar />
      </RequiredAuth>
    }
  >
    <Route index element={<Booking_Reservation_Page />} />
  </Route>
]

export default ReservationAdminRoutes;