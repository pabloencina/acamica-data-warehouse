import Head from "next/head";
import { Box, Container, Card, CardContent } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { useContext, useEffect, useState } from "react";
import { CompanyListToolbar } from "src/components/company/company-list-toolbar";
import { CompanyTable } from "src/components/company/company-table";
import { getAllCompanies } from "src/services/companiesService";
import { AppContext } from "src/utils/app-context-provider";
import { getAllRegions } from "src/services/regionsService";
import { getAllCountries } from "src/services/countriesService";

const Companies = () => {
    const [companies, setCompanies] = useState([]);

    const { regions, handleRegionUpdate } = useContext(AppContext);

    const verifyRegions = async () => {
        if (regions.length === 0) {
            const result = await getAllRegions();
            handleRegionUpdate(result);
        }

        const companiesResponse = await getAllCompanies();
        setCompanies(companiesResponse.data);
    };

    useEffect(() => {
        verifyRegions();
    }, []);

    return (
        <>
            <Head>
                <title>Companies</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth={false}>
                    <CompanyListToolbar />
                    <Box sx={{ mt: 3 }}>
                        <Card>
                            <CardContent>
                                <CompanyTable companies={companies} setCompanies={setCompanies} />
                            </CardContent>
                        </Card>
                    </Box>
                </Container>
            </Box>
        </>
    );
};
Companies.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

// https://www.youtube.com/watch?v=2qgs7buSnHQ
export default Companies;
