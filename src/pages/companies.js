import Head from "next/head";
import { Box, Container, Card, CardContent } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useState } from "react";
import { CompanyListToolbar } from "src/components/company/company-list-toolbar";
import { CompanyTable } from "src/components/company/company-table";
import { getAllCompanies } from "src/services/companiesService";

const Companies = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        getAllCompanies()
            .then((response) => {
                let companiesResponse = response.data;
                setCompanies(companiesResponse);
            })
            .catch((e) => {});
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
