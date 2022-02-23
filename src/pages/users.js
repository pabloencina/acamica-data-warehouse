import Head from "next/head";
import { Box, Container } from "@mui/material";
import { UserListResults } from "src/components/user/user-list-result";
import { UserListToolbar } from "src/components/user/user-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { users } from "src/__mocks__/users";

const Users = () => (
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
          <UserListResults users={users} />
        </Box>
      </Container>
    </Box>
  </>
);
Users.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Users;
