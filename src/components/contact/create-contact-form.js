import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    MenuItem,
    TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { postContact } from "src/services/contactsService";
import { AppContext } from "src/utils/app-context-provider";
import * as Yup from "yup";
import AddChannelDialog from "./add-channel-dialog";
import ChannelTable from "./channel-table";
import { optionsInterest } from "./constants";

export const CreateContactForm = () => {
    const { regions, companies } = useContext(AppContext);

    const [channels, setChannels] = useState([]);

    const addChannel = (newChannel) => {
        setChannels([...channels, newChannel]);
    };

    const deleteChannel = (id) => {
        const filteredChannels = channels.filter((channel) => {
            return channel._id !== id;
        });
        setChannels(filteredChannels);
    };

    const [selectedRegion, setSelectedRegion] = useState({
        _id: "",
        countries: [],
    });
    const [selectedCountry, setSelectedCountry] = useState({
        _id: "",
        cities: [],
    });

    const regionOnChange = (e) => {
        const regionId = e.target.value;
        const regionFound = regions.find((region) => region._id === regionId);
        setSelectedRegion(regionFound);
        setSelectedCountry({
            cities: [],
        });
    };

    const countryOnChange = (e) => {
        const countryId = e.target.value;
        const countryFound = selectedRegion?.countries?.find(
            (country) => country._id === countryId
        );
        setSelectedCountry(countryFound);
    };

    const [state, setState] = useState({
        formError: false,
        dialogOpen: false,
        errorMessage: "",
        error: false,
    });

    const router = useRouter();

    const handleDialogClose = () => {
        setState({
            ...state,
            dialogOpen: false,
        });
        router.push("/contacts");
    };

    const formikCreateContact = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            position: "",
            company: "",
            city: "",
            address: "",
            interest: optionsInterest[2].value,
        },

        validationSchema: Yup.object({
            name: Yup.string().max(10).min(3).required("Name is required"),
            surname: Yup.string().max(15).min(3).required("Surname is required"),
            address: Yup.string().max(15).min(3).required("Address is required"),
            email: Yup.string()
                .email("Must be a valid email")
                .max(40)
                .min(10)
                .required("Email is required"),
            position: Yup.mixed()
                //.oneOf(optionsPreference, "Position must be one of the options")
                .required("Position is required"),
        }),

        onSubmit: async (values) => {
            try {
                values.channels = channels;
                const response = await postContact(values);

                setState({
                    ...state,
                    dialogOpen: true,
                    formError: false,
                });
            } catch (error) {
                console.log(error);
                let message = "Contact creation failed.";
                if (error.response) {
                    if (error.response.status === 400) {
                        message += " Please verify the fields in the form.";
                    } else if (error.response.status === 409) {
                        message += " The email already exists in the database.";
                    } else if (error.response.status === 500) {
                        message += " There's issues in the server. Please try again later...";
                    }
                } else {
                    message += " Can't connect with the server. Please try again later...";
                }
                setState({
                    ...state,
                    errorMessage: message,
                    formError: true,
                });
            }
        },
    });

    return (
        <>
            <form onSubmit={formikCreateContact.handleSubmit}>
                <Card>
                    <CardHeader title="New contact" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    max="10"
                                    min="3"
                                    onChange={formikCreateContact.handleChange}
                                    onBlur={formikCreateContact.handleBlur}
                                    required
                                    value={formikCreateContact.values.name}
                                    variant="outlined"
                                    error={Boolean(
                                        formikCreateContact.touched.name &&
                                            formikCreateContact.errors.name
                                    )}
                                    helperText={
                                        formikCreateContact.touched.name &&
                                        formikCreateContact.errors.name
                                    }
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Surname"
                                    name="surname"
                                    onChange={formikCreateContact.handleChange}
                                    onBlur={formikCreateContact.handleBlur}
                                    required
                                    value={formikCreateContact.values.surname}
                                    variant="outlined"
                                    error={Boolean(
                                        formikCreateContact.touched.surname &&
                                            formikCreateContact.errors.surname
                                    )}
                                    helperText={
                                        formikCreateContact.touched.surname &&
                                        formikCreateContact.errors.surname
                                    }
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    error={Boolean(
                                        formikCreateContact.touched.email &&
                                            formikCreateContact.errors.email
                                    )}
                                    fullWidth
                                    helperText={
                                        formikCreateContact.touched.email &&
                                        formikCreateContact.errors.email
                                    }
                                    label="Email"
                                    name="email"
                                    type="email"
                                    onChange={formikCreateContact.handleChange}
                                    onBlur={formikCreateContact.handleBlur}
                                    required
                                    value={formikCreateContact.values.email}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    error={Boolean(
                                        formikCreateContact.touched.position &&
                                            formikCreateContact.errors.position
                                    )}
                                    helperText={
                                        formikCreateContact.touched.position &&
                                        formikCreateContact.errors.position
                                    }
                                    label="Position"
                                    name="position"
                                    //type="email"
                                    onChange={formikCreateContact.handleChange}
                                    onBlur={formikCreateContact.handleBlur}
                                    required
                                    value={formikCreateContact.values.position}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    value={formikCreateContact.values.company}
                                    error={Boolean(
                                        formikCreateContact.touched.company &&
                                            formikCreateContact.errors.company
                                    )}
                                    fullWidth
                                    helperText={
                                        formikCreateContact.touched.company &&
                                        formikCreateContact.errors.company
                                    }
                                    label="Company"
                                    name="company"
                                    select
                                    onChange={formikCreateContact.handleChange}
                                    onBlur={formikCreateContact.handleBlur}
                                    //type="company"
                                    variant="outlined"
                                    required
                                >
                                    {companies.map((company) => {
                                        return (
                                            <MenuItem key={company._id} value={company._id}>
                                                {company.name}
                                            </MenuItem>
                                        );
                                    })}
                                </TextField>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Card>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        value={formikCreateContact.values.region}
                                        name="region"
                                        select
                                        fullWidth
                                        variant="outlined"
                                        label="Region"
                                        placeholder="Select region"
                                        onChange={regionOnChange}
                                        error={Boolean(
                                            formikCreateContact.touched.region &&
                                                formikCreateContact.errors.region
                                        )}
                                        helperText={
                                            formikCreateContact.touched.region &&
                                            formikCreateContact.errors.region
                                        }
                                    >
                                        {regions.map((region) => {
                                            return (
                                                <MenuItem value={region._id} key={region._id}>
                                                    {region.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Country"
                                        name="country"
                                        select
                                        onChange={countryOnChange}
                                        required
                                        value={formikCreateContact.values.country}
                                        variant="outlined"
                                        error={Boolean(
                                            formikCreateContact.touched.country &&
                                                formikCreateContact.errors.country
                                        )}
                                        helperText={
                                            formikCreateContact.touched.country &&
                                            formikCreateContact.errors.country
                                        }
                                    >
                                        {selectedRegion?.countries?.map((country) => {
                                            return (
                                                <MenuItem value={country._id} key={country._id}>
                                                    {country.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        label="City"
                                        name="city"
                                        select
                                        fullWidth
                                        onChange={formikCreateContact.handleChange}
                                        onBlur={formikCreateContact.handleBlur}
                                        required
                                        value={formikCreateContact.values.city}
                                        variant="outlined"
                                        error={Boolean(
                                            formikCreateContact.touched.city &&
                                                formikCreateContact.errors.city
                                        )}
                                        helperText={
                                            formikCreateContact.touched.city &&
                                            formikCreateContact.errors.city
                                        }
                                    >
                                        {selectedCountry?.cities?.map((city) => {
                                            return (
                                                <MenuItem value={city._id} key={city._id}>
                                                    {city.name}
                                                </MenuItem>
                                            );
                                        })}
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        name="address"
                                        placeholder="Enter an address"
                                        max="10"
                                        min="3"
                                        onChange={formikCreateContact.handleChange}
                                        onBlur={formikCreateContact.handleBlur}
                                        required
                                        value={formikCreateContact.values.address}
                                        variant="outlined"
                                        error={Boolean(
                                            formikCreateContact.touched.address &&
                                                formikCreateContact.errors.address
                                        )}
                                        helperText={
                                            formikCreateContact.touched.address &&
                                            formikCreateContact.errors.address
                                        }
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        value={formikCreateContact.values.interest}
                                        name="interest"
                                        select="true"
                                        label="Interest"
                                        fullWidth
                                        variant="outlined"
                                        onChange={(event) => {
                                            formikCreateContact.setFieldValue(
                                                "interest",
                                                event.target.value
                                            );
                                        }}
                                    >
                                        {optionsInterest.map((option) => {
                                            return (
                                                <MenuItem value={option.value} key={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            );
                                        })}
                                    </TextField>
                                </Grid>
                                <Divider />
                            </Grid>
                        </CardContent>
                        <Divider />
                        <Box sx={{ display: "flex", justifyContent: "end", mr: 5, mt: 2 }}>
                            <AddChannelDialog addChannel={addChannel} />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <ChannelTable channels={channels} deleteChannel={deleteChannel} />
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "end",
                                p: 5,
                            }}
                        >
                            <Button
                                color="primary"
                                disabled={formikCreateContact.isSubmitting}
                                variant="contained"
                                underline="hover"
                                type="submit"
                            >
                                Create
                            </Button>
                        </Box>
                    </Card>
                </Card>
                <Divider />
            </form>

            <Dialog
                open={state.dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{}</DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The contact has been created successfully.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleDialogClose}>OK</Button>
                </DialogActions>
            </Dialog>

            {state.formError ? <Alert severity="error">{state.errorMessage}</Alert> : null}
        </>
    );
};
