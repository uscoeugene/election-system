import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Alert, Container, Typography, TextField, Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import { createOrganization, updateOrganization } from '../../redux/actions/organizationActions';
import UserMasterpage from './UserMasterpage';
import { useNavigate } from 'react-router-dom';

const OrganizationForm = ({ organization, isEdit }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(organization ? organization.name : '');
  const [address, setAddress] = useState(organization ? organization.address : '');
  const [contactEmail, setContactEmail] = useState(organization ? organization.contactEmail : '');
  const [contactPhone, setContactPhone] = useState(organization ? organization.contactPhone : '');
  const [isActive, setIsActive] = useState(organization ? organization.isActive : true);
  const [description, setDescription] = useState(organization ? organization.description : '');

  const clearFields = () => {
    setName('');
    setAddress('');
    contactEmail('');
    setContactPhone('');
    setIsActive(false);
    setDescription('');
  }

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Get the organization state from the Redux store
  const organizationState = useSelector((state) => state.organizationsList);

  useEffect(() => {
    console.log(organizationState.success)
    if (organizationState.success) {
        clearFields();
      setSuccessMessage(isEdit ? 'Organization updated successfully!' : 'Organization created successfully!', "Redirecting in 5s...");
      setErrorMessage('');

      setTimeout(() => {
        navigate('/user/organizations');
      }, 5000);
    } else if (organizationState.error) {
      setErrorMessage(organizationState.error);
      setSuccessMessage('');

    }
  }, [organizationState.success, organizationState.error, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const orgData = {
      name,
      address,
      contactEmail,
      contactPhone,
      description,
      isActive,
    };

    if (isEdit) {
      dispatch(updateOrganization(organization._id, orgData));
    } else {
      dispatch(createOrganization(orgData));
    }
  };

  return (
    <div>
      <UserMasterpage />
      <Container maxWidth="sm">
        <Typography variant="h4">{isEdit ? 'Edit Organization' : 'Create Organization'}</Typography>
        <form onSubmit={handleSubmit}>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}
          {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}

          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="Contact Email"
            fullWidth
            margin="normal"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
          <TextField
            label="Contact Phone"
            fullWidth
            margin="normal"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
          />
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Description
            </Typography>
            <ReactQuill
              value={description}
              onChange={setDescription}
              modules={{
                toolbar: [
                  [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ 'align': [] }],
                  ['link', 'image', 'video'],
                  ['clean']
                ]
              }}
            />
          </div>
          <div style={{ margin: '20px 0' }}>
            <label>
              Is Active
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                style={{ marginLeft: '10px' }}
              />
            </label>
          </div>
          <Button type="submit" variant="contained" color="primary">
            {isEdit ? 'Update Organization' : 'Create Organization'}
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default OrganizationForm;
