import React from 'react'
import { Route } from 'react-router-dom';
import StaySuite_LandingPage from '../pages/LandingPage';
import StaySuite_Public from '../layouts/Public_Layout';
import StaySuite_Homes_Public from '../pages/Homes_Public';
import StaySuite_Rooms_Public from '../pages/Rooms_Public';
import StaySuite_Public_Blogs from '../pages/Blog';
import StaySuite_Public_Blog_Article from '../pages/Blog_Article';
import Unauthorized from '../pages/Unauthorized';
import { CheckAuth } from '@/lib/Auth';

const LandingRoutes = () => [
    <Route path="/" element={<CheckAuth><StaySuite_Public /></CheckAuth>}>
      <Route index element={<StaySuite_LandingPage />} />
      <Route path="/homes" element={<StaySuite_Homes_Public />} />
      {/* You need to make it as dynamic route */}
      <Route path="/homes/room" element={<StaySuite_Rooms_Public />} />
      <Route path="/blog" element={<StaySuite_Public_Blogs />} />
      <Route path="/story" element={<StaySuite_Public_Blog_Article />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Route>
]

export default LandingRoutes;