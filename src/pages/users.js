import Head from "next/head";
import {
  Box, Container, Card,
  CardContent,
} from "@mui/material";
import { UserListResults } from "src/components/user/user-list-result";
import { UserListToolbar } from "src/components/user/user-list-toolbar";
import { UserTable } from "src/components/user/user-table";
import { DashboardLayout } from "../components/dashboard-layout";
// import { users } from "src/__mocks__/users";
import { useEffect, useState } from "react";
import { getAllUsers } from "src/services/users";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((response) => {
      let usersResponse = response.data;
      console.log(usersResponse);
      setUsers(usersResponse);
    })
      .catch((e) => {
        console.log(e);
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
          <Box sx={{ mt: 3 }}>
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
//<UserListResults users={users} />
//<UserTable users={users} />
Users.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Users;
