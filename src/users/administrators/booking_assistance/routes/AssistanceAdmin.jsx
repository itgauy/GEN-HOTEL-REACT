import React from 'react'
import { Route } from 'react-router-dom';
import Booking_Reservation_Appbar from '../layouts/Appbar';
import Booking_Reservation_Page from '../pages/MainPage';
import Knowledge_Appbar from '../layouts/Appbar';
import Knowledge_Page from '../pages/MainPage';
import Booking_Assistance_Appbar from '../layouts/Appbar';
import Booking_Assistance_Page from '../pages/MainPage';

const BookingAssistanceRoutes = () => [
    <Route path="/assistance-admin" element={<Booking_Assistance_Appbar />}>
      <Route index element={<Booking_Assistance_Page />} />
    </Route>
]

export default BookingAssistanceRoutes;