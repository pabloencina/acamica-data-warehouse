import { Box, Card, CardContent, Container } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { UserListResults } from "src/components/user/user-list-result";
import { UserListToolbar } from "src/components/user/user-list-toolbar";
import { getAllUsers } from "src/services/usersService";
import { DashboardLayout } from "../components/dashboard-layout";

const Users = () => {
    const [users, setUsers] = useState([]);

    const init = async () => {
        try {
            const result = await getAllUsers();

            setUsers(result);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <>
            <Head>
                <title>Users</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container>
                    <UserListToolbar />
                    <Box sx={{ mt: 3 }}>
                        <Card>
                            <CardContent>
                                <UserListResults users={users} setUsers={setUsers} />
                            </CardContent>
                        </Card>
                    </Box>
                </Container>
            </Box>
        </>
    );
};
Users.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// https://www.youtube.com/watch?v=2qgs7buSnHQ
export default Users;
