import Head from "next/head";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { CreateContactForm } from "src/components/contact/create-contact/create-contact-form";

const CreateContact = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Contact</title>
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
                            router.push("/contacts");
                        }}
                    >
                        Back
                    </Button>
                    <Typography sx={{ mb: 3 }} variant="h4">
                        Create contact
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item lg={2} md={2} xs={2}></Grid>
                        <Grid item lg={8} md={6} xs={12}>
                            <CreateContactForm />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

CreateContact.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default CreateContact;
