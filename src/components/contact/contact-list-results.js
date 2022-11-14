import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
    Avatar,
    Box,
    Button,
    Card,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const Impexpicons = SwapVertIcon;

export const ContactListResults = ({ contacts, ...rest }) => {
    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleSelectAll = (event) => {
        let newSelectedContactIds;

        if (event.target.checked) {
            newSelectedContactIds = contacts.map((contact) => contact.id);
        } else {
            newSelectedContactIds = [];
        }

        setSelectedContactIds(newSelectedContactIds);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedContactIds.indexOf(id);
        let newSelectedContactIds = [];

        if (selectedIndex === -1) {
            newSelectedContactIds = newSelectedContactIds.concat(selectedContactIds, id);
        } else if (selectedIndex === 0) {
            newSelectedContactIds = newSelectedContactIds.concat(selectedContactIds.slice(1));
        } else if (selectedIndex === selectedContactIds.length - 1) {
            newSelectedContactIds = newSelectedContactIds.concat(selectedContactIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedContactIds = newSelectedContactIds.concat(
                selectedContactIds.slice(0, selectedIndex),
                selectedContactIds.slice(selectedIndex + 1)
            );
        }

        setSelectedContactIds(newSelectedContactIds);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Card {...rest}>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1000 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedContactIds.length === contacts.length}
                                        color="primary"
                                        indeterminate={
                                            selectedContactIds.length > 0 &&
                                            selectedContactIds.length < contacts.length
                                        }
                                        onChange={handleSelectAll}
                                        sx={{ mr: 1 }}
                                    />
                                </TableCell>

                                <TableCell>
                                    Contact
                                    <Button startIcon={<Impexpicons />} sx={{ mr: 1 }}></Button>
                                </TableCell>
                                <TableCell>
                                    Region/city
                                    <Button startIcon={<Impexpicons />} sx={{ mr: 1 }}></Button>
                                </TableCell>
                                <TableCell>
                                    Company
                                    <Button startIcon={<Impexpicons />} sx={{ mr: 1 }}></Button>
                                </TableCell>

                                <TableCell>
                                    Position
                                    <Button startIcon={<Impexpicons />} sx={{ mr: 1 }}></Button>
                                </TableCell>

                                <TableCell>
                                    interests
                                    <Button startIcon={<Impexpicons />} sx={{ mr: 1 }}></Button>
                                </TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contacts.slice(0, limit).map((contact) => (
                                <TableRow
                                    hover
                                    key={contact.id}
                                    selected={selectedContactIds.indexOf(contact.id) !== -1}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedContactIds.indexOf(contact.id) !== -1}
                                            onChange={(event) => handleSelectOne(event, contact.id)}
                                            value="true"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: "center",
                                                display: "flex",
                                            }}
                                        >
                                            <Avatar src={contact.avatarUrl} sx={{ mr: 2 }}>
                                                {getInitials(contact.name)}
                                            </Avatar>
                                            <Typography color="textPrimary" variant="body1">
                                                {contact.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{contact.email}</TableCell>
                                    <TableCell>
                                        {`${contact.address.city}, ${contact.address.state}, ${contact.address.country}`}
                                    </TableCell>
                                    <TableCell>{contact.phone}</TableCell>
                                    <TableCell>{format(contact.createdAt, "dd/MM/yyyy")}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={contacts.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

ContactListResults.propTypes = {
    contacts: PropTypes.array.isRequired,
};
