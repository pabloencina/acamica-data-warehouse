import Head from "next/head";
import { Box, Container } from "@mui/material";
import { ContactListResults } from "../components/contact/contact-list-results";
import { ContactListToolbar } from "../components/contact/contact-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { useEffect, useState } from "react";
import { getAllContacts } from "src/services/contactsService";

const Contacts = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getAllContacts()
            .then((response) => {
                let contactsResponse = response.data;
                setContacts(contactsResponse);
                console.log(contactsResponse);
            })
            .catch((e) => {});
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
                <Container maxWidth={false}>
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
