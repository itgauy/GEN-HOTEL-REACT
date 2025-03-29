import React from 'react'
import { Route } from 'react-router-dom';
import StaySuite_User from '../layouts/User_Layout';
import StaySuite_User_Onboard from '../pages/StaySuite_Onboard';
import StaySuite_User_Room from '../pages/StaySuite_Room';
import StaySuite_User_Blogs from '../pages/StaySuite_Blog';
import StaySuite_User_Booking_Reservation from '../pages/StaySuite_Reservations';
import StaySuite_User_Blog_Article from '../pages/StaySuite_Blog_Article';

const GuestUserRoute = () => [
    <Route path="/user/onboard" element={<StaySuite_User />}>
        <Route index element={<StaySuite_User_Onboard />} />
        <Route path="/user/onboard/room" element={<StaySuite_User_Room />} />
        <Route path="/user/onboard/blog/" element={<StaySuite_User_Blogs />} />
        <Route path="/user/onboard/bookings" element={<StaySuite_User_Booking_Reservation />} />
        <Route path="/user/onboard/blog/story" element={<StaySuite_User_Blog_Article />} />
    </Route>
]

export default GuestUserRoute;