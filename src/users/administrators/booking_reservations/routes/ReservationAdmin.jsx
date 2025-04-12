import React from 'react'
import { Route } from 'react-router-dom';
import Booking_Reservation_Appbar from '../layouts/Appbar';
import Booking_Reservation_Page from '../pages/MainPage';

const ReservationAdminRoutes = () => [
    <Route path="/reservations-admin" element={<Booking_Reservation_Appbar />}>
      <Route index element={<Booking_Reservation_Page />} />
      {/* <Route path="/room-admin/homes" element={} /> */}
    </Route>
]

export default ReservationAdminRoutes;