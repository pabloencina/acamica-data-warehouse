import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useRouter } from "next/router";
import AlertDeleteUser from "./alert-delete-user";

export const UserTable = (params) => {
    const { users, setUsers } = params;

    const router = useRouter();

    const columns = [
        {
            field: "name",
            headerName: "Name",
            height: 100,
        },
        {
            field: "surname",
            headerName: "Surname",
            // maxWidth: "xl",
            height: 100,
        },
        {
            field: "email",
            headerName: "Email",
            type: "email",
            // maxWidth: "xl",
            height: 100,
        },
        {
            field: "profile",
            headerName: "Profile",
            sortable: true,
            // maxWidth: "xl",
            height: 100,
        },
        {
            field: "action",
            headerName: "Action",
            // maxWidth: "xl",
            sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api = params.api;

                    const thisRow = {};

                    api.getAllColumns()
                        .filter((column) => column.field !== "__check__" && !!column)
                        .forEach((column) => {
                            return (thisRow[column.field] = params.getValue(
                                params.id,
                                column.field
                            ));
                        });
                    return alert(JSON.stringify(thisRow, null, 5));
                };

                // https://stackoverflow.com/questions/64331095/how-to-add-a-button-to-every-row-in-mui-datagrid

                return (
                    <Box>
                        <Tooltip title="Edit user">
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
                            // user={ users."find"( (user) => user._id === params.row._id ) }
                            user={params.row}
                            userId={params.row._id}
                            setUsers={setUsers}
                        />
                    </Box>
                );
            },
        },
    ];

    return (
        <Box style={{ height: 400 }}>
            <DataGrid
                style={{ height: 400 }}
                rows={users}
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </Box>
    );
};
