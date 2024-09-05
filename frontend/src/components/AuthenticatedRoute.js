import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthenticatedRoute = ({ element: Component, ...rest }) => {
  const { user } = useSelector((state) => state.auth);
console.log(user);
  return user ? Component : <Navigate to="/signin" />;
};

export default AuthenticatedRoute;
