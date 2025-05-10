import React from 'react'
import { Route } from 'react-router-dom';
import Booking_Reservation_Appbar from '../layouts/Appbar';
import Booking_Reservation_Page from '../pages/MainPage';
import ReservationsData from '../pages/Reservations';
import { RequiredAuth } from '@/lib/Auth';
import Reservation_UpdateData from '../pages/UpdateData';
import BookingAnalytics from '../pages/Analytics';

const ReservationAdminRoutes = () => [
  <React.Fragment key="reservation-routes">
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
      <Route path="bookings" element={<ReservationsData />} />
      <Route path="analytics" element={<BookingAnalytics />} />
    </Route>
    <Route
      key="bookings_manage"
      path="/reservations-admin/bookings/manage/:id"
      element={
        <RequiredAuth>
          <Reservation_UpdateData />
        </RequiredAuth>
      }
    />
  </React.Fragment>
]

export default ReservationAdminRoutes;