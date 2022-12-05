import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import { useRouter } from "next/router";

export const ContactListToolbar = (props) => {
    const router = useRouter();

    return (
        <Box {...props}>
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
                        <Box sx={{ maxWidth: 250 }}>
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
                                placeholder="Search contact by name"
                                variant="outlined"
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};
