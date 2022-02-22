import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ContactListResults } from '../components/contact/contact-list-results';
import { ContactListToolbar } from '../components/contact/contact-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { contacts } from '../__mocks__/contacts';

const Contacts = () => (
  <>
    <Head>
      <title>
        Contacts | Material kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <ContactListToolbar />
        <Box sx={{ mt: 3 }}>
          <ContactListResults contacts={contacts} />
        </Box>
      </Container>
    </Box>
  </>
);
Contacts.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Contacts;
