import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SwapVertIcon from "@mui/icons-material/SwapVert";
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
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import AlertDeleteCompany from "./alert-delete-company";
import { getAllCompanies } from "src/services/companiesService";

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
            newSelectedCompanyIds = companies.map((company) => company._id);
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

    const onCompanyDeleted = async () => {
        getAllCompanies().then((response) => {
            setCompanies(response); // Modifica la lista trayendo a todos los usuarios menos el usuario eliminado
        });
    };

    return (
        <Card>
            <PerfectScrollbar>
                <Box>
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

                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>City</TableCell>

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
                                        <Box>{company.name}</Box>
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
                                            <Tooltip title="Edit Company">
                                                <IconButton
                                                    onClick={() => {
                                                        router.push({
                                                            pathname: "/edit-company",
                                                            query: {
                                                                id: company._id,
                                                            },
                                                        });
                                                        console.log(company._id);
                                                    }}
                                                >
                                                    <EditOutlinedIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <AlertDeleteCompany
                                                company={company}
                                                //companyId={company._id}
                                                onCompanyDeleted={onCompanyDeleted}
                                            />
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
    companies: PropTypes.array.isRequired,
};
