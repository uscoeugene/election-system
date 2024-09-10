import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GuestHeader from './GuestHeader';
import {signup} from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch a signup action here
    dispatch(signup({ username, fullname, email, password, phone }))
    .then(() =>{
        navigate('/signin');
    });
  };

  return (
    <div>
      <GuestHeader />
      <Container>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Full Name"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Phone"
              type="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </Button>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default SignUpPage;
