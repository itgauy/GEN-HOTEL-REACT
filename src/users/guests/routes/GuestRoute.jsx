import React from 'react'
import { Route } from 'react-router-dom';
import StaySuite_User from '../layouts/User_Layout';
import StaySuite_User_Onboard from '../pages/StaySuite_Onboard';
import StaySuite_User_Room from '../pages/StaySuite_Room';
import StaySuite_User_Blogs from '../pages/StaySuite_Blog';
import StaySuite_User_Booking_Reservation from '../pages/StaySuite_Reservations';
import StaySuite_User_Blog_Article from '../pages/StaySuite_Blog_Article';
import { CheckAuth, RequiredAuth } from '@/lib/Auth';
import ProfilePage from '../pages/UserAccount';

const GuestUserRoute = () => [
    <Route path="/user/onboard" element={<RequiredAuth><StaySuite_User /></RequiredAuth>}>
        <Route index element={<CheckAuth><StaySuite_User_Onboard /></CheckAuth>} />
        <Route path="/user/onboard/room/:id" element={<StaySuite_User_Room />} />
        <Route path="/user/onboard/account/profile" element={<ProfilePage />} />
        <Route path="/user/onboard/blog/" element={<StaySuite_User_Blogs />} />
        <Route path="/user/onboard/bookings" element={<StaySuite_User_Booking_Reservation />} />
        <Route path="/user/onboard/blog/story" element={<StaySuite_User_Blog_Article />} />
    </Route>
]

export default GuestUserRoute;