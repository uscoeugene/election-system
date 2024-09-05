

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Guest/Homepage';
import SignIn from './components/Guest/SignIn';
import SignUp from './components/Guest/SignUp';
import UserDashboard from './components/User/UserDashboard';
import AdminDashboard from './components/SuperAdmin/SuperAdminDashboard';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/dashboard" element={<AuthenticatedRoute element={<UserDashboard />} />} />
        <Route path="/admin/dashboard" element={<AuthenticatedRoute element={<AdminDashboard />} />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default App;
