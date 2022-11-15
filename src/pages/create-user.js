import Head from "next/head";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { CreateUserForm } from "../components/account/create-user-form";
import { DashboardLayout } from "../components/dashboard-layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

const CreateUser = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>User</title>
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
                            <CreateUserForm />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

CreateUser.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateUser;
