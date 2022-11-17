import Head from "next/head";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { CreateUserForm } from "../components/account/create-user-form";
import { DashboardLayout } from "../components/dashboard-layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { CreateCompanyForm } from "src/components/company/create-company-form";

const CreateUser = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Company</title>
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
                            router.push("/companies");
                        }}
                    >
                        Back
                    </Button>
                    <Typography sx={{ mb: 3 }} variant="h4">
                        Create company
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item lg={2} md={2} xs={2}></Grid>
                        <Grid item lg={8} md={6} xs={12}>
                            <CreateCompanyForm />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

CreateUser.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateUser;