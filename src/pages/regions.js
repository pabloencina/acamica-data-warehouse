import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import CollapsibleTable from "src/components/region/region";
import { regions } from "src/__mocks__/region";

const Regions = () => (
    <>
        <Head>
            <title>Regions | Material kit</title>
        </Head>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
            }}
        >
            <Container maxWidth={false}>
                <Box sx={{ mt: 3 }}>
                    <CollapsibleTable regions={regions} />
                </Box>
            </Container>
        </Box>
    </>
);
Regions.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Regions;