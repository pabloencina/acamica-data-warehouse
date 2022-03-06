import Head from "next/head";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
//import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from "../components/account/account-profile-details";
import { DashboardLayout } from "../components/dashboard-layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

const Account = () => {

  const router = useRouter();
  return (
    <>
      <Head>
        <title>User | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Button
            component="a"
            startIcon={<ArrowBackIcon fontSize="small" />}
            onClick={() => {
              router.push("/users");
            }}
          >
            Back
          </Button>
          <Typography sx={{ mb: 3 }} variant="h4">
            Create user
          </Typography>
          <Grid container spacing={1}>
            <Grid item lg={2} md={2} xs={2}></Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;
