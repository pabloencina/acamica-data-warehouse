import Head from "next/head";
import { Box, Card, CardContent, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import RegionTable from "src/components/region/region-table";
import { getAllRegions } from "src/services/regionsService";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "src/utils/app-context-provider";

const Regions = () => {
    const [regions, setRegions] = useState([]);
    const { handleRegionUpdate } = useContext(AppContext);

    const refreshRegions = async () => {
        const regions = await getAllRegions();
        setRegions(regions);
        handleRegionUpdate(regions);
    };

    useEffect(() => {
        refreshRegions();
    }, []);

    return (
        <>
            <Head>
                <title>Regions</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container>
                    <RegionTable regions={regions} refreshRegions={refreshRegions} />
                </Container>
            </Box>
        </>
    );
};
Regions.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Regions;
