import { Box, Container } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { getAllContacts } from "src/services/contactsService";
import { ContactListResults } from "../components/contact/contact-list-results";
import { ContactListToolbar } from "../components/contact/contact-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [contactList, setContactList] = useState([]);

    const fetchContacts = async () => {
        const result = await getAllContacts();
        setContacts(result);
        setContactList(result);
    };

    useEffect(() => {
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
                <Container>
                    <ContactListToolbar contactList={contactList} setContacts={setContacts} />
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
