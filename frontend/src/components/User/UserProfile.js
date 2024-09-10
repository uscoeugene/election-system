import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFromToken } from '../../redux/actions/authActions';
import { Container, Typography, Box } from '@mui/material';
import UserMasterpage from './UserMasterpage';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserFromToken());
    }
  }, [dispatch, user]);

  return (
    <div>
    <UserMasterpage />
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </Typography>
        {user && (
          <Box>
            <Typography variant="h6">Name: {user.fullname}</Typography>
            <Typography variant="h6">Email: {user.email}</Typography>
            <Typography variant="h6">Phone Number: {user.phone}</Typography>
            <Typography variant="h6">Username: {user.username}</Typography>
            <Typography variant="h6">Member Since: { Date(user.createdAt).toString()}</Typography>
            {/* Add more user details as needed */}
          </Box>
        )}
      </Box>
    </Container>
    </div>
  );
};

export default UserProfile;
