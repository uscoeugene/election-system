import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, CircularProgress, Typography, Grid, Autocomplete, Alert, MenuItem, Select, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { createElection, getElectionDetails, updateElection } from '../../redux/actions/electionActions';
import { getOrganizations } from '../../redux/actions/organizationActions';
import UserMasterpage from './UserMasterpage';

const voteMethods = ['SMS', 'Email', 'SMSandEmail', 'OneClick']; // Example options
const statuses = ['Started', 'Ended', 'Ongoing', 'NotStarted', 'Suspended', 'Cancelled']; // Example options

const ElectionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [electionData, setElectionData] = useState({
    electionName: '',
    startDateTime: '',
    endDateTime: '',
    specialInstructions: '',
    organizationId: null,
    voteMethod: '',
    status: '',
    electionCode: '',
  });

  const { election } = useSelector((state) => state.elections);
  const { organizations } = useSelector((state) => state.organizationsList);
  const { loading, success, error } = useSelector((state) => state.elections);
  const { loading: updateLoading, success: updateSuccess, error: updateError } = useSelector((state) => state.elections);

  useEffect(() => {
    if (id) {
      dispatch(getElectionDetails(id));
    }
    dispatch(getOrganizations());
  }, [dispatch, id]);

  useEffect(() => {
    if (election && id) {
      setElectionData({
        electionName: election.electionName,
        startDateTime: (new Date(election.startDateTime).toLocaleString()),
        endDateTime: (new Date(election.endDateTime).toLocaleString()),
        specialInstructions: election.specialInstructions,
        organizationId: organizations.find(org => org._id === election.organizationId), // Corrected field name
        voteMethod: election.voteMethod,
        status: election.status,
        electionCode: election.electionCode,
      });
    }
  }, [election, id, organizations]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElectionData({ ...electionData, [name]: value });
  };

  const handleOrganizationChange = (event, newValue) => {
    setElectionData({ ...electionData, organizationId: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateElection({ 
        ...electionData, 
        _id: id, 
        organizationId: electionData.organizationId?._id // Ensure correct field name
      }));
    } else {
      dispatch(createElection({ 
        ...electionData, 
        organizationId: electionData.organizationId?._id // Ensure correct field name
      }));
    }
  };

  useEffect(() => {
    if (success || updateSuccess) {
      navigate('/user/elections');
    }
  }, [success, updateSuccess, navigate]);

  return (
    <div>
      <UserMasterpage />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {id ? 'Update Election' : 'Create Election'}
        </Typography>
        {error || updateError ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || updateError}
          </Alert>
        ) : null}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="electionName"
              label="Election Name"
              value={electionData.electionName}
              onChange={handleInputChange}
              fullWidth
              required
              error={!electionData.electionName && (error || updateError)}
              helperText={!electionData.electionName && (error || updateError) ? "Election Name is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="startDateTime"
              label="Start Date & Time"
              type="datetime-local"
              value={electionData.startDateTime}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              error={!electionData.startDateTime && (error || updateError)}
              helperText={!electionData.startDateTime && (error || updateError) ? "Start Date & Time is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="endDateTime"
              label="End Date & Time"
              type="datetime-local"
              value={electionData.endDateTime}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              error={!electionData.endDateTime && (error || updateError)}
              helperText={!electionData.endDateTime && (error || updateError) ? "End Date & Time is required" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Autocomplete
              options={organizations}
              getOptionLabel={(option) => option.name}
              value={electionData.organizationId}
              onChange={handleOrganizationChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Organization"
                  fullWidth
                  required
                  error={!electionData.organizationId && (error || updateError)}
                  helperText={!electionData.organizationId && (error || updateError) ? "Organization is required" : ""}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Vote Method</InputLabel>
              <Select
                name="voteMethod"
                value={electionData.voteMethod}
                onChange={handleInputChange}
                label="Vote Method"
                error={!electionData.voteMethod && (error || updateError)}
              >
                {voteMethods.map(method => (
                  <MenuItem key={method} value={method}>{method}</MenuItem>
                ))}
              </Select>
              {!electionData.voteMethod && (error || updateError) ? (
                <FormHelperText>Vote Method is required</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={electionData.status}
                onChange={handleInputChange}
                label="Status"
                error={!electionData.status && (error || updateError)}
              >
                {statuses.map(status => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </Select>
              {!electionData.status && (error || updateError) ? (
                <FormHelperText>Status is required</FormHelperText>
              ) : null}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="electionCode"
              label="Election Code"
              value={electionData.electionCode}
              onChange={handleInputChange}
              fullWidth
              required
              error={!electionData.electionCode && (error || updateError)}
              helperText={!electionData.electionCode && (error || updateError) ? "Election Code is required" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="specialInstructions"
              label="Special Instructions"
              value={electionData.specialInstructions}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading || updateLoading}
              endIcon={loading || updateLoading ? <CircularProgress size="1rem" /> : null}
            >
              {id ? 'Update Election' : 'Create Election'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ElectionForm;
