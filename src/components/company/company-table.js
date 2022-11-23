import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
    Box,
    Button,
    Card,
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useRouter } from "next/router";
//import AlertDeleteContact from "./alert-delete-contact";

const Impexpicons = SwapVertIcon;

export const CompanyTable = (params) => {
    const { companies, setCompanies } = params;

    const router = useRouter();
    const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleSelectAll = (event) => {
        let newSelectedCompanyIds;

        if (event.target.checked) {
            console.log(event.target.checked);
            newSelectedCompanyIds = companies.map((company) => company.id);
        } else {
            newSelectedCompanyIds = [];
        }

        setSelectedCompanyIds(newSelectedCompanyIds);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedCompanyIds.indexOf(id);
        let newSelectedCompanyIds = [];

        if (selectedIndex === -1) {
            newSelectedCompanyIds = newSelectedCompanyIds.concat(selectedCompanyIds, id);
        } else if (selectedIndex === 0) {
            newSelectedCompanyIds = newSelectedCompanyIds.concat(selectedCompanyIds.slice(1));
        } else if (selectedIndex === selectedCompanyIds.length - 1) {
            newSelectedCompanyIds = newSelectedCompanyIds.concat(selectedCompanyIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedCompanyIds = newSelectedCompanyIds.concat(
                selectedCompanyIds.slice(0, selectedIndex),
                selectedCompanyIds.slice(selectedIndex + 1)
            );
        }

        setSelectedCompanyIds(newSelectedCompanyIds);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Card>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1000 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedCompanyIds.length === companies.length}
                                        color="primary"
                                        indeterminate={
                                            selectedCompanyIds.length > 0 &&
                                            selectedCompanyIds.length < companies.length
                                        }
                                        onChange={handleSelectAll}
                                        sx={{ mr: 1 }}
                                    />
                                </TableCell>

                                <TableCell>
                                    Name
                                    <Button startIcon={<Impexpicons />}></Button>
                                </TableCell>
                                <TableCell>
                                    Email
                                    <Button startIcon={<Impexpicons />}></Button>
                                </TableCell>
                                <TableCell>
                                    Phone
                                    <Button startIcon={<Impexpicons />}></Button>
                                </TableCell>
                                <TableCell>
                                    Address
                                    <Button startIcon={<Impexpicons />}></Button>
                                </TableCell>
                                <TableCell>
                                    City
                                    <Button startIcon={<Impexpicons />}></Button>
                                </TableCell>

                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companies.slice(0, limit).map((company) => (
                                <TableRow
                                    hover
                                    key={company._id}
                                    selected={selectedCompanyIds.indexOf(company._id) !== -1}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedCompanyIds.indexOf(company._id) !== -1}
                                            onChange={(event) =>
                                                handleSelectOne(event, company._id)
                                            }
                                            value="true"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                // alignItems: "center",
                                                display: "flex",
                                                width: 175,
                                            }}
                                        >
                                            <Typography color="textPrimary">
                                                <>{company.name}</>
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>{company.email}</Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>{company.phone}</Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <div>{company.address}</div>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>{company.city.name} </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            {/* <AlertDeleteContact setContacts={setCompanies} />
                                            <Tooltip title="Edit Company">
                                                <IconButton
                                                    onClick={() => {
                                                        // https://github.com/vercel/next.js/discussions/17008
                                                        router.push("/edit-company");
                                                        console.log(params.row);
                                                    }}
                                                >
                                                    <EditOutlinedIcon fontSize="big" />
                                                </IconButton>
                                            </Tooltip> */}
                                            <Tooltip title="Edit Company">
                                                <IconButton onClick={() => {}}>
                                                    <EditOutlinedIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete Company">
                                                <IconButton onClick={() => {}}>
                                                    <DeleteOutlineIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={companies.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

CompanyTable.propTypes = {
    contacts: PropTypes.array.isRequired,
};
