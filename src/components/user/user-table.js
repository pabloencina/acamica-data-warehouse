import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRouter } from "next/router";
import AlertDeleteUser from "./alertDeleteUser";
import { ConstructionOutlined } from "@mui/icons-material";

export const UserTable = (params) => {
  const { users, setUsers } = params;

  const router = useRouter();

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 250,
    },
    {
      field: "surname",
      headerName: "Surname",
      width: 250,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 150,
    },
    {
      field: "profile",
      headerName: "Profile",
      sortable: true,
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
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
              return (thisRow[column.field] = params.getValue(params.id, column.field));
            });
          return alert(JSON.stringify(thisRow, null, 4));
        };

        // https://stackoverflow.com/questions/64331095/how-to-add-a-button-to-every-row-in-mui-datagrid

        //  const deleteUser = (id) => {

        //    setUsers(users.filter((item) => item._id !== id))

        // };

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

            <AlertDeleteUser
              // user={ users.find( (user) => user._id === params.row._id ) }
              user={params.row}
              userId={params.row._id}
              setUsers={setUsers}
            />

          </div>
        );
      },
    },
  ];

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

/*
<Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  <AlertDialog/>
                  //deleteUser(params.row._id);
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
              
            </Tooltip>
*/
