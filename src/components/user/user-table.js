import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRouter } from "next/router";

const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 170,
  },
  {
    field: "surname",
    headerName: "Surname",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    type: "email",
    width: 300,
  },
  {
    field: "profile",
    headerName: "Profile",
    sortable: true,
    width: 200,
  },
  {
    field: "action",
    headerName: "Action",
    width: 100,
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((column) => column.field !== "__check__" && !!column)
          .forEach((column) => {
            //console.log(column)
            return thisRow[column.field] = params.getValue(params.id, column.field);
          });
        console.log(params)
        return alert(JSON.stringify(thisRow, null, 4));
      };
      // https://stackoverflow.com/questions/64331095/how-to-add-a-button-to-every-row-in-mui-datagrid
      const router = useRouter();
      return (
        <div>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                // https://github.com/vercel/next.js/discussions/17008
                router.push({
                  pathname: "/edit-user",
                  query: {
                    id: params.row._id,
                  },
                });
                
              }}
            >
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
    },
  },
];

export const UserTable = ({ users: users, ...rest }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
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
};
