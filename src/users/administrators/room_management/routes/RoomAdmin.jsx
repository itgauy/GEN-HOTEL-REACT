import React from 'react'
import { Route } from 'react-router-dom';
import Room_Management_Appbar from '../layouts/Appbar';
import Room_Management_Page from '../pages/MainPage';

const RoomAdminRoutes = () => [
    <Route path="/room-admin" element={<Room_Management_Appbar />}>
      <Route index element={<Room_Management_Page />} />
      {/* <Route path="/room-admin/homes" element={} /> */}
    </Route>
]

export default RoomAdminRoutes;