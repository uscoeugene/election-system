import React from 'react';
import AuthenticatedHeader from '../AuthenticatedRoute';
import { Container, Typography, Box } from '@mui/material';

const SuperAdminDashboard = () => {
  return (
    <div>
      <AuthenticatedHeader />
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Dashboard
          </Typography>
          {/* Admin tasks and functionalities */}
        </Box>
      </Container>
    </div>
  );
};

export default SuperAdminDashboard;
