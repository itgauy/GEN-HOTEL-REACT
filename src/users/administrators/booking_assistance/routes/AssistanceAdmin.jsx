import React from 'react'
import { Route } from 'react-router-dom';
import Booking_Assistance_Appbar from '../layouts/Appbar';
import Booking_Assistance_Page from '../pages/MainPage';
import { RequiredAuth } from '@/lib/Auth';

const BookingAssistanceRoutes = () => [
  <Route
    key="assistance-admin"
    path="/assistance-admin"
    element={
      <RequiredAuth>
        <Booking_Assistance_Appbar />
      </RequiredAuth>
    }
  >
    <Route index element={<Booking_Assistance_Page />} />
  </Route>
]

export default BookingAssistanceRoutes;