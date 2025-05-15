import React from 'react';
import { Route } from 'react-router-dom';
import OverAll_Appbar from '../layouts/Appbar';
import { RequiredAuth } from '@/lib/Auth';
import All_Admin_Page from '../pages/Overview';
import Room_Management_Page from '../pages/RoomManagement';
import Add_New_Room from '../pages/AddNewRoom';
import Book_Reservation from '../pages/Reservation_Page';
import Book_Analytic from '../pages/Book_Analytics';
import Reserve_Update_Data from '../pages/Reservation_Data';
import Forum_Overview from '../pages/Forum_Overview';
import Add_New_Forum from '../pages/AddNewForum';
import Manage_Forum from '../pages/ManageForum';
import CMS_Overview from '../pages/CMS_Overview';

const OverAllAdminRoutes = () => [
  <React.Fragment key="overall-admin-route">
    {/* Routes that include the Appbar */}
    <Route
      key="admin-route"
      path="/hms-admin"
      element={
        <RequiredAuth>
          <OverAll_Appbar />
        </RequiredAuth>
      }
    >
      <Route index element={<All_Admin_Page />} />
      <Route path="room-data" element={<Room_Management_Page />} />
      <Route path="book-data" element={<Book_Reservation />} />
      <Route path="book-analytic" element={<Book_Analytic />} />
      <Route path="hotel-forums" element={<Forum_Overview />} />
      <Route path="hotel-cms" element={<CMS_Overview />} />
    </Route>
    {/* add some route for sub pages*/}
    <Route
      key="add-new-room"
      path="/hms-admin/room-data/add"
      element={
        <RequiredAuth>
          <Add_New_Room />
        </RequiredAuth>
      }
    />
    <Route
      key="bookings_manage"
      path="/hms-admin/bookings/:id"
      element={
        <RequiredAuth>
          <Reserve_Update_Data />
        </RequiredAuth>
      }
    />
    <Route
      key="add-new-room"
      path="/hms-admin/hotel-forums/add"
      element={
        <RequiredAuth>
          <Add_New_Forum />
        </RequiredAuth>
      }
    />
    <Route
      key="add-new-room"
      path="/hms-admin/manage-forums/:id"
      element={
        <RequiredAuth>
          <Manage_Forum />
        </RequiredAuth>
      }
    />
  </React.Fragment>,
];

export default OverAllAdminRoutes;