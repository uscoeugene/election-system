import React from 'react';
import UserMasterpage from './UserMasterpage';
import { Container, Typography, Box } from '@mui/material';

const UserDashboard = () => {
    console.log("Arrived at User Dashnoard");
  return (
    <div>
      <UserMasterpage />
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            User Dashboard
          </Typography>
          {/* User tasks and functionalities */}
        </Box>
      </Container>
    </div>
  );
};

export default UserDashboard;
