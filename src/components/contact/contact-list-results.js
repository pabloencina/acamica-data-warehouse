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
import AlertDeleteContact from "./alert-delete-contact";

const Impexpicons = SwapVertIcon;

export const ContactListResults = (params) => {
    const { contacts, setContacts } = params;
    console.log(contacts);
    const router = useRouter();
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
        <Card>
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
                                    <Button startIcon={<Impexpicons />}></Button>
                                </TableCell>
                                <TableCell>
                                    Position
                                    <Button startIcon={<Impexpicons />}></Button>
                                </TableCell>
                                <TableCell>
                                    Company
                                    <Button startIcon={<Impexpicons />}></Button>
                                </TableCell>
                                <TableCell>
                                    Address
                                    <Button startIcon={<Impexpicons />}></Button>
                                </TableCell>
                                <TableCell>
                                    Channels
                                    <Button startIcon={<Impexpicons />}></Button>
                                </TableCell>

                                <TableCell>
                                    Interest
                                    <Button startIcon={<Impexpicons />}></Button>
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
                                                // alignItems: "center",
                                                display: "flex",
                                                width: 175,
                                            }}
                                        >
                                            <Typography color="textPrimary">
                                                <>
                                                    {contact.name}, {contact.surname}{" "}
                                                    {contact.email}
                                                </>
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>{contact.position}</Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>{contact.company.name}</Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <div>
                                                {contact.city.name}, {contact.address}
                                            </div>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            {contact.channels.map((channel) => {
                                                return <div>{channel.channel}</div>;
                                            })}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>{contact.interest} %</Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <AlertDeleteContact setContacts={setContacts} />
                                            <Tooltip title="Edit Contact">
                                                <IconButton
                                                    onClick={() => {
                                                        // https://github.com/vercel/next.js/discussions/17008
                                                        router.push("/edit-contact");
                                                        console.log(params.row);
                                                    }}
                                                >
                                                    <EditOutlinedIcon fontSize="big" />
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
