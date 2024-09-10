
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({ element: Component }) => {
  
  const { user, token } = useSelector((state) => state.auth);
  console.log(user);
  console.log(token);
  return user && token ? Component : <Navigate to="/signin" />;
};

export default AuthenticatedRoute;
