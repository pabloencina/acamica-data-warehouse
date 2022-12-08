import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import {
    Box,
    Card,
    Checkbox,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
} from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { getAllContacts } from "src/services/contactsService";
import AlertDeleteContact from "./alert-delete-contact";

const Impexpicons = SwapVertIcon;

export const ContactListResults = (params) => {
    const { contacts, setContacts } = params;
    const router = useRouter();
    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleSelectAll = (event) => {
        let newSelectedContactIds;

        if (event.target.checked) {
            newSelectedContactIds = contacts.map((contact) => contact._id);
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

    const onContactDeleted = async () => {
        getAllContacts().then((response) => {
            setContacts(response); // Modifica la lista trayendo a todos los usuarios menos el usuario eliminado
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

                                <TableCell>Contact</TableCell>
                                <TableCell>Position</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Channels</TableCell>
                                <TableCell>Interest</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {contacts.slice(0, limit).map((contact) => (
                                <TableRow
                                    hover
                                    key={contact._id}
                                    selected={selectedContactIds.indexOf(contact._id) !== -1}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedContactIds.indexOf(contact._id) !== -1}
                                            onChange={(event) =>
                                                handleSelectOne(event, contact._id)
                                            }
                                            value="true"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <Stack>
                                                <div>
                                                    {contact.name}, {contact.surname}
                                                </div>
                                                <div>{contact.email}</div>
                                            </Stack>
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
                                            <Stack>
                                                <div>{contact.address},</div>
                                                <div>{contact.city.name}</div>
                                            </Stack>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            {contact.channels.map((channel) => {
                                                return (
                                                    <div key={channel.channel}>
                                                        {channel.channel}
                                                    </div>
                                                );
                                            })}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>{contact.interest} %</Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <Stack direction="row" spacing={2}>
                                                <Tooltip title="Edit Contact">
                                                    <IconButton
                                                        onClick={() => {
                                                            // https://github.com/vercel/next.js/discussions/17008
                                                            router.push("/edit-contact");
                                                        }}
                                                    >
                                                        <EditOutlinedIcon fontSize="big" />
                                                    </IconButton>
                                                </Tooltip>
                                                <AlertDeleteContact
                                                    contact={contact}
                                                    onContactDeleted={onContactDeleted}
                                                />
                                            </Stack>
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
