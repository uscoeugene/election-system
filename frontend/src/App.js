

import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUserFromToken } from './redux/actions/authActions';
import HomePage from './components/Guest/Homepage';
import SignIn from './components/Guest/SignIn';
import SignUp from './components/Guest/SignUp';

import UserDashboard from './components/User/UserDashboard';
import OrganizationForm from './components/User/OrganizationForm'
import OrganizationListing from './components/User/organizationListing';

import AdminDashboard from './components/SuperAdmin/SuperAdminDashboard';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import './App.css';
import UserProfile from './components/User/UserProfile';

import ElectionForm from './components/User/ElectionForm';
import ElectionListing from './components/User/ElectionListing'; // Assuming you have this component

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserFromToken());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user/dashboard" element={<AuthenticatedRoute element={<UserDashboard />} />} />
        <Route path="/user/profile" element={<AuthenticatedRoute element={<UserProfile />} />} />
        <Route path="/user/organization/create" element={<AuthenticatedRoute element={<OrganizationForm isEdit={false} />} />} />
        <Route path="/user/organization/edit/:id" element={<AuthenticatedRoute element={<OrganizationForm isEdit={true} />} />} />
        <Route path="user/organizations/" element={<AuthenticatedRoute element={<OrganizationListing />} />} />
        <Route path="user/elections/" element={<AuthenticatedRoute element={<ElectionListing />} />} />
        <Route path="user/election/create" element={<AuthenticatedRoute element={<ElectionForm />} />} />
        <Route path="user/election/edit/:id" element={<AuthenticatedRoute element={<ElectionForm />} />} />
        
        {/* Other routes */}
        <Route path="/admin/dashboard" element={<AuthenticatedRoute element={<AdminDashboard />} />} />

      </Routes>
    </Router>
  );
};

export default App;
