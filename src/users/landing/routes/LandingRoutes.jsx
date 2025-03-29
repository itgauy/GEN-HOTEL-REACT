import React from 'react'
import { Route } from 'react-router-dom';
import StaySuite_LandingPage from '../pages/LandingPage';
import StaySuite_Public from '../layouts/Public_Layout';
import StaySuite_Homes_Public from '../pages/Homes_Public';
import StaySuite_Rooms_Public from '../pages/Rooms_Public';
import StaySuite_Public_Blogs from '../pages/Blog';
import StaySuite_Public_Blog_Article from '../pages/Blog_Article';

const LandingRoutes = () => [
    <Route path="/" element={<StaySuite_Public />}>
      <Route index element={<StaySuite_LandingPage />} />
      <Route path="/homes" element={<StaySuite_Homes_Public />} />
      {/* You need to make it as dynamic route */}
      <Route path="/homes/room" element={<StaySuite_Rooms_Public />} />
      <Route path="/blog" element={<StaySuite_Public_Blogs />} />
      <Route path="/story" element={<StaySuite_Public_Blog_Article />} />
    </Route>
]
  
export default LandingRoutes;