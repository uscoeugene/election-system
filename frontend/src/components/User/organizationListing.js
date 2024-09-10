import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganizations, deleteOrganization } from '../../redux/actions/organizationActions';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UserMasterpage from './UserMasterpage';

const OrganizationListing = ({ history }) => {
  const dispatch = useDispatch();

  const organizationState = useSelector(state => state.organizationsList);
  const { loading, error, organizations } = organizationState;
  

//   const organizationDelete = useSelector(state => state.organizationDelete );
//   const { success: successDelete } = organizationDelete;

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch, organizationState.success, organizationState.error]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteOrganization(id));
    }
  };

  return (
    <div>
    <UserMasterpage />
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Organizations</Typography>
      <Button variant="contained" color="primary" component={Link} to="/user/organization/create">Create Organization</Button>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>{error}</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SN</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Contact Email</TableCell>
                <TableCell>Contact Phone</TableCell>
                <TableCell>Is Active</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {organizations && organizations.map((organization, index) => (
                <TableRow key={organization._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{organization.name}</TableCell>
                  <TableCell>{organization.address}</TableCell>
                  <TableCell>{organization.contactEmail}</TableCell>
                  <TableCell>{organization.contactPhone}</TableCell>
                  <TableCell>{organization.isActive ? 'Yes' : 'No'}</TableCell>
                  <TableCell dangerouslySetInnerHTML={{ __html: organization.description }}></TableCell>
                  <TableCell>
                    <IconButton component={Link} to={`/organization/edit/${organization._id}`}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteHandler(organization._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
    </div>
  );
};

export default OrganizationListing;
