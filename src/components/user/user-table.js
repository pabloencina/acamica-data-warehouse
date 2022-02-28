import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: '_id', hide: true },
  { field: 'name', headerName: 'First name', width: 130 },
  { field: 'surname', headerName: 'Last name', width: 130 },

  {
    field: 'email',
    headerName: 'Age',
    type: 'email'
  },
  {
    field: 'profile',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
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
