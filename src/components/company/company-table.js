import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useRouter } from "next/router";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const CompanyTable = (params) => {
    const { companies, setCompanies } = params;

    const router = useRouter();

    const columns = [
        {
            field: "name",
            headerName: "Name",
            width: 200,
            height: 100,
        },
        {
            field: "address",
            headerName: "Address",
            width: 200,
        },
        {
            field: "email",
            headerName: "Email",
            type: "email",
            width: 200,
        },
        {
            field: "phone",
            headerName: "Phone",
            sortable: true,
            width: 150,
        },
        {
            field: "city",
            headerName: "City",
            sortable: true,
            width: 150,
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
                    <div>
                        <Tooltip title="Edit company">
                            <IconButton
                                onClick={() => {
                                    // https://github.com/vercel/next.js/discussions/17008
                                    router.push({
                                        pathname: "/edit-company",
                                        query: {
                                            id: params.row._id,
                                        },
                                    });
                                    console.log(params.row);
                                }}
                            >
                                <EditOutlinedIcon fontSize="big" />
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete company">
                            <IconButton
                                onClick={() => {
                                    handleClickOpen();
                                }}
                            >
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <DataGrid
                rows={companies}
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
};
