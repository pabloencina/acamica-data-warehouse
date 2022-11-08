import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import CollapsibleTable from "src/components/region/region";
import { getAllRegions } from "src/services/regionsService";
import { useEffect, useState } from "react";

const Regions = () => {
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        getAllRegions()
            .then((response) => {
                let usersResponse = response.data;
                setRegions(usersResponse);
            })
            .catch((e) => {});
    }, []);
    return (
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
                        <CollapsibleTable regions={regions} setRegions={setRegions} />
                    </Box>
                </Container>
            </Box>
        </>
    );
};
Regions.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Regions;
