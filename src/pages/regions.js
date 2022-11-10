import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import RegionTable from "src/components/region/region";
import { getAllRegions } from "src/services/regionsService";
import { useEffect, useState } from "react";

const Regions = () => {
    const [regions, setRegions] = useState([]);

    const refreshRegions = async () => {
        await getAllRegions()
            .then((response) => {
                setRegions(response.data);
            })
            .catch((e) => {});
    };

    useEffect(() => {
        refreshRegions();
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
                        <RegionTable regions={regions} refreshRegions={refreshRegions} />
                    </Box>
                </Container>
            </Box>
        </>
    );
};
Regions.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Regions;
