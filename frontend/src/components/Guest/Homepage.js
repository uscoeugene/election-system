import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import GuestHeader from './GuestHeader';

const HomePage = () => {
  return (
    <div>
      <GuestHeader />
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to the Election System
          </Typography>
          {/* Top 5 Active Elections Section */}
        </Box>
      </Container>
    </div>
  );
};

export default HomePage;
