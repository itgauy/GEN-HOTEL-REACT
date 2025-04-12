import React from 'react'
import { Route } from 'react-router-dom';
import Booking_Reservation_Appbar from '../layouts/Appbar';
import Booking_Reservation_Page from '../pages/MainPage';
import Knowledge_Appbar from '../layouts/Appbar';
import Knowledge_Page from '../pages/MainPage';

const KnowledgeAdminRoutes = () => [
    <Route path="/kms-admin" element={<Knowledge_Appbar />}>
      <Route index element={<Knowledge_Page />} />
      {/* <Route path="/room-admin/homes" element={} /> */}
    </Route>
]

export default KnowledgeAdminRoutes;