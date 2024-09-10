// components/ElectionList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { listElections, deleteElection } from '../../redux/actions/electionActions';
import UserMasterpage from './UserMasterpage';

const ElectionList = () => {
  const dispatch = useDispatch();
  
  const { elections, loading, error } = useSelector((state) => state.elections);
  const { loading: deleteLoading, success: deleteSuccess } = useSelector((state) => state.elections);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString(); //.format('dddd, MMMM D, YYYY h:mm A');
  };

  
  useEffect(() => {
    dispatch(listElections());
  }, [dispatch, deleteSuccess]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this election?')) {
      dispatch(deleteElection(id));
    }
  };

  return (
    <div>
        <UserMasterpage />
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Elections
      </Typography>
      <Button component={RouterLink} to="/user/election/create" variant="contained" color="primary" sx={{ mb: 2 }}>
        Create Election
      </Button>
      {loading || deleteLoading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Start Date & Time</TableCell>
                <TableCell>End Date & Time</TableCell>
                <TableCell>Organization</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {elections.map((election) => (
                <TableRow key={election._id}>
                  <TableCell>{election.electionName}</TableCell>
                  <TableCell>{formatDate(election.startDateTime)}</TableCell>
                  <TableCell>{formatDate(election.endDateTime)}</TableCell>
                  <TableCell>{election.organizationId.name}</TableCell>
                  <TableCell>
                    <IconButton component={RouterLink} to={`/user/election/edit/${election._id}`} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(election._id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
    </div>
  );
};

export default ElectionList;
