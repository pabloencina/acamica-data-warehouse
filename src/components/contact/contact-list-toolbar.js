import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    InputAdornment,
    SvgIcon,
    TextField,
    Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import PropTypes from "prop-types";

export const ContactListToolbar = (props) => {
    const { contactList, setContacts } = props;

    const router = useRouter();

    const searchContact = (e) => {
        filterContact(e.target.value);
    };

    const filterContact = (search) => {
        const filtered = contactList.filter((contact) => {
            if (
                contact.name.toString().toLowerCase().includes(search.toLowerCase()) ||
                contact.surname.toString().toLowerCase().includes(search.toLowerCase()) ||
                contact.email.toString().toLowerCase().includes(search.toLowerCase()) ||
                contact.address.toString().toLowerCase().includes(search.toLowerCase()) ||
                contact.city.name.toString().toLowerCase().includes(search.toLowerCase()) ||
                contact.company.name.toString().toLowerCase().includes(search.toLowerCase()) ||
                contact.position.toString().toLowerCase().includes(search.toLowerCase())
            ) {
                return true;
            }
        });
        setContacts(filtered);
    };

    return (
        <Box>
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    m: -1,
                }}
            >
                <Typography sx={{ m: 1 }} variant="h6">
                    Contacts
                </Typography>
                <Box sx={{ m: 1 }}>
                    <Button
                        sx={{ m: 1 }}
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            router.push("/create-contact");
                        }}
                    >
                        Add Contact
                    </Button>
                </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Grid item md={6} xs={12}>
                            <TextField
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon color="action" fontSize="small">
                                                <SearchIcon />
                                            </SvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Search contact"
                                variant="outlined"
                                onChange={searchContact}
                            ></TextField>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

ContactListToolbar.propTypes = {
    contactList: PropTypes.array.isRequired,
    setContacts: PropTypes.func.isRequired,
};
