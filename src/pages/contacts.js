import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { getAllContacts } from "src/services/contactsService";
import { getAllRegions } from "src/services/regionsService";
import { AppContext } from "src/utils/app-context-provider";
import { ContactListResults } from "../components/contact/contact-list-results";
import { ContactListToolbar } from "../components/contact/contact-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const { regions, handleRegionUpdate } = useContext(AppContext);

    const verifyRegions = async () => {
        if (regions.length === 0) {
            const result = await getAllRegions();
            handleRegionUpdate(result);
        }
    };

    const fetchContacts = async () => {
        const result = await getAllContacts();
        setContacts(result.data);
    };

    useEffect(() => {
        verifyRegions();
        fetchContacts();
    }, []);

    return (
        <>
            <Head>
                <title>Contacts</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth={true}>
                    <ContactListToolbar />
                    <Box sx={{ mt: 3 }}>
                        <ContactListResults contacts={contacts} setContacts={setContacts} />
                    </Box>
                </Container>
            </Box>
        </>
    );
};
Contacts.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Contacts;
