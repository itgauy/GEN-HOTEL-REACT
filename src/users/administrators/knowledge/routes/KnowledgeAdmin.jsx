import React from 'react'
import { Route } from 'react-router-dom';
import Knowledge_Appbar from '../layouts/Appbar';
import Knowledge_Page from '../pages/Overview';
import { RequiredAuth } from '@/lib/Auth';
import Content_Management_Page from '../pages/ContentManagement';
import Article_Management from '../pages/ArticleManagement';
import Hotel_Services_Contacts from '../pages/Contacts';

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
    <Route path="/kms-admin/cms-portal" element={<Content_Management_Page />} />
    <Route path="/kms-admin/article-management" element={<Article_Management />} />
    <Route path="/kms-admin/contact-list" element={<Hotel_Services_Contacts />} />
  </Route>
]

export default KnowledgeAdminRoutes;