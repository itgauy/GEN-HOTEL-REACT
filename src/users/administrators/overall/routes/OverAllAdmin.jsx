import React from 'react';
import { Route } from 'react-router-dom';
import Room_Management_Appbar from '../layouts/Appbar';
import Room_Management_Page from '../pages/MainPage';
import { RequiredAuth } from '@/lib/Auth';
import Room_Data from '../pages/RoomData';
import Add_New_Room from '../pages/AddData';

const OverAllAdminRoutes = () => [
  <React.Fragment key="room-admin-routes">
    {/* Routes that include the Appbar */}
    <Route
      key="room-admin"
      path="/room-admin"
      element={
        <RequiredAuth>
          <Room_Management_Appbar />
        </RequiredAuth>
      }
    >
      <Route index element={<Room_Management_Page />} />
      <Route path="room-data" element={<Room_Data />} />
    </Route>
    {/* add some route for sub pages*/}
    {/* <Route
      key="add-new-room"
      path="/room-admin/room-data/add"
      element={
        <RequiredAuth>
          <Add_New_Room />
        </RequiredAuth>
      }
    /> */}
  </React.Fragment>,
];

export default OverAllAdminRoutes;