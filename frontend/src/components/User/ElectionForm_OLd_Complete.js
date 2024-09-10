import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, Autocomplete, CircularProgress } from '@mui/material';
import api from '../utils/api';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ElectionForm = () => {
  const [organizations, setOrganizations] = useState([]);
  const [election, setElection] = useState({
    organizationId: '',
    electionName: '',
    startDateTime: '',
    endDateTime: '',
    voteMethod: '',
    coverImage: '',
    specialInstructions: '',
    status: '',
    electionCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/organizations');
        setOrganizations(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchOrganizations();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchElection = async () => {
        try {
          const { data } = await api.get(`/elections/${id}`);
          setElection(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchElection();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setElection({
      ...election,
      [name]: value
    });
  };

  const handleAutocompleteChange = (event, value) => {
    setElection({
      ...election,
      organizationId: value ? value._id : ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (id) {
        await api.put(`/elections/${id}`, election);
      } else {
        await api.post('/elections', election);
      }
      setIsSubmitting(false);
      navigate('/elections');
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            options={organizations}
            getOptionLabel={(option) => option.organizationName}
            value={organizations.find(org => org._id === election.organizationId) || null}
            onChange={handleAutocompleteChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Organization"
                variant="outlined"
                required
                fullWidth
              />
            )}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="electionName"
            label="Election Name"
            variant="outlined"
            required
            fullWidth
            value={election.electionName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="startDateTime"
            label="Start Date Time"
            type="datetime-local"
            variant="outlined"
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={election.startDateTime}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="endDateTime"
            label="End Date Time"
            type="datetime-local"
            variant="outlined"
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={election.endDateTime}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="voteMethod"
            label="Vote Method"
            variant="outlined"
            required
            fullWidth
            value={election.voteMethod}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="coverImage"
            label="Cover Image URL"
            variant="outlined"
            fullWidth
            value={election.coverImage}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="specialInstructions"
            label="Special Instructions"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={election.specialInstructions}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="status"
            label="Status"
            variant="outlined"
            required
            fullWidth
            value={election.status}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="electionCode"
            label="Election Code"
            variant="outlined"
            required
            fullWidth
            value={election.electionCode}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              endIcon={isSubmitting && <CircularProgress size={24} />}
              sx={{
                position: 'relative',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              {id ? 'Update Election' : 'Create Election'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ElectionForm;
