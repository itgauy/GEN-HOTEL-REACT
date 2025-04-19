import React from 'react'
import { Route } from 'react-router-dom';
import Knowledge_Appbar from '../layouts/Appbar';
import Knowledge_Page from '../pages/MainPage';
import { RequiredAuth } from '@/lib/Auth';

const KnowledgeAdminRoutes = () => [
  <Route
    key="kms-admin"
    path="/kms-admin"
    element={
      <RequiredAuth>
        <Knowledge_Appbar />
      </RequiredAuth>
    }
  >
    <Route index element={<Knowledge_Page />} />
  </Route>
]

export default KnowledgeAdminRoutes;