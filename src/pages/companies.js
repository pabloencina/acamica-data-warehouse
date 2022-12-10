import { Box, Card, CardContent, Container } from "@mui/material";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { CompanyListToolbar } from "src/components/company/company-list-toolbar";
import { CompanyTable } from "src/components/company/company-table";
import { getAllCompanies } from "src/services/companiesService";
import { AppContext } from "src/utils/app-context-provider";
import { DashboardLayout } from "../components/dashboard-layout";

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const { handleCompanyUpdate } = useContext(AppContext);

    const fetchCompanies = async () => {
        const companiesResponse = await getAllCompanies();
        setCompanies(companiesResponse);
        handleCompanyUpdate(companiesResponse);
    };

    useEffect(() => {
        fetchCompanies();
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
                <Container>
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
