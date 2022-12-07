import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
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
import { getAllUsers } from "src/services/usersService";
import AlertDeleteUser from "./alert-delete-user";

export const UserListResults = (params) => {
    const { users, setUsers } = params;
    console.log(users);

    const router = useRouter();
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleSelectAll = (event) => {
        let newSelectedUsersIds;

        if (event.target.checked) {
            newSelectedUsersIds = users.map((user) => user._id);
        } else {
            newSelectedUsersIds = [];
        }

        setSelectedUserIds(newSelectedUsersIds);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedUserIds.indexOf(id);
        let newSelectedUserIds = [];

        if (selectedIndex === -1) {
            newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds, id);
        } else if (selectedIndex === 0) {
            newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds.slice(1));
        } else if (selectedIndex === selectedUserIds.length - 1) {
            newSelectedUserIds = newSelectedUserIds.concat(selectedUserIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedUserIds = newSelectedUserIds.concat(
                selectedUserIds.slice(0, selectedIndex),
                selectedUserIds.slice(selectedIndex + 1)
            );
        }

        setSelectedUserIds(newSelectedUserIds);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const onUserDeleted = () => {
        getAllUsers().then((response) => {
            // Trae a todos los usuarios.

            setUsers(response); // Modifica la lista trayendo a todos los usuarios menos el usuario eliminado
        });
    };

    return (
        <Card>
            <PerfectScrollbar>
                <Box>
                    <Table>
                        <TableHead>
                            <TableRow key={"header"}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedUserIds.length === users.length}
                                        color="primary"
                                        indeterminate={
                                            selectedUserIds.length > 0 &&
                                            selectedUserIds.length < users.length
                                        }
                                        onChange={handleSelectAll}
                                        sx={{ mr: 1 }}
                                    />
                                </TableCell>

                                <TableCell>Name</TableCell>
                                <TableCell>Surname</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Profile</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.slice(0, limit).map((user) => (
                                <TableRow
                                    hover
                                    key={user._id}
                                    selected={selectedUserIds.indexOf(user._id) !== -1}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedUserIds.indexOf(user._id) !== -1}
                                            onChange={(event) => handleSelectOne(event, user._id)}
                                            value="true"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <Stack>
                                                <div>{user.name}</div>
                                            </Stack>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>
                                            <Stack>
                                                <div>{user.surname}</div>
                                            </Stack>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>{user.email}</Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box>{user.profile}</Box>
                                    </TableCell>

                                    <TableCell>
                                        <Box>
                                            <Tooltip title="Edit user">
                                                <IconButton
                                                    onClick={() => {
                                                        // https://github.com/vercel/next.js/discussions/17008
                                                        router.push({
                                                            pathname: "/edit-user",
                                                            query: {
                                                                id: user._id,
                                                            },
                                                        });
                                                    }}
                                                >
                                                    <EditOutlinedIcon fontSize="big" />
                                                </IconButton>
                                            </Tooltip>
                                            <AlertDeleteUser
                                                user={user}
                                                onUserDeleted={onUserDeleted}
                                            />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
                <Box></Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={users.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

UserListResults.propTypes = {
    users: PropTypes.array.isRequired,
    setUsers: PropTypes.func.isRequired,
};
