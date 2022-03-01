import * as React from 'react';
import { DataGrid, GridApi, GridCellValue } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { IconButton, Tooltip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const columns = [
  {
    field: 'name',
    headerName: 'Name',
     
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
  // {
  //   field: 'actions',
  //   headerName: 'Actions',
  //   width: 200,
  //   sortable: false,
  // },
  {
    field: "action",
    headerName: "Action",
    width: 200,
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );

        return alert(JSON.stringify(thisRow, null, 4));
      };
      // https://stackoverflow.com/questions/64331095/how-to-add-a-button-to-every-row-in-mui-datagrid
      return (
        <div>
          <Tooltip title="Edit">
            <IconButton onClick={onClick}>
              <EditOutlinedIcon fontSize="big" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton onClick={onClick}>
              <DeleteOutlineIcon />
            </IconButton>
          </Tooltip>
        </div>
      );
    }
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
