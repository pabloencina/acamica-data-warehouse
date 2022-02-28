import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: '_id',
    hide: true
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 175
  },
  {
    field: 'surname',
    headerName: 'Surname',
    width: 200
  },

  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 300,
  },
  {
    field: 'profile',
    headerName: 'Profile',
    sortable: true,
    width: 150,
  },
  {
    field: 'password',
    headerName: 'Password',
    hide: true
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 200,
  },
];

export const UserTable = ({ users: users, ...rest }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
