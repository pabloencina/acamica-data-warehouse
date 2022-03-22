import Head from "next/head";
import {
  Box, Container, Card,
  CardContent,
} from "@mui/material";

import { UserListToolbar } from "src/components/user/user-list-toolbar";
import { UserTable } from "src/components/user/user-table";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useState } from "react";
import { getAllUsers } from "src/services/usersService";


const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((response) => {
      let usersResponse = response.data;
      setUsers(usersResponse);
    })
      .catch((e) => {
      });
  }, []);

  return (
    <>
      <Head>
        <title>Users | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <UserListToolbar />
          <Box sx={{ mt: 3}}>
            <Card>
              <CardContent>
                <UserTable users={users} />
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
