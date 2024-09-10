import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';

const UserMasterpage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
console.log(user);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Election System | User Master Page
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/user/dashboard">Dashboard</Button>
        <Button color="inherit" component={Link} to="/user/organizations">My Organizations</Button>
        <Button color="inherit" component={Link} to="/user/elections">Elections</Button>
        <Button color="inherit" component={Link} to="/user/profile">Profile</Button>
        {user && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default UserMasterpage;
