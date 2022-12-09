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
import { useContext, useEffect, useState } from "react";
import { getCompanyById } from "src/services/companiesService";
import { editContact, getContactById } from "src/services/contactsService";
import { AppContext } from "src/utils/app-context-provider";
import * as Yup from "yup";
import AddChannelDialog from "./add-channel-dialog";
import ChannelTable from "./channel-table";

export const EditContactForm = (props) => {
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

    const optionsInterest = [
        {
            value: 0,
            label: "0%",
        },
        {
            value: 25,
            label: "25%",
        },
        {
            value: 50,
            label: "50%",
        },
        {
            value: 75,
            label: "75%",
        },
        {
            value: 100,
            label: "100%",
        },
    ];

    const regionOnChange = (e) => {
        const regionId = e.target.value;
        const regionFound = regions.find((region) => region._id === regionId);
        setSelectedRegion(regionFound);
        setSelectedCountry({
            cities: [],
        });
        formik.setFieldValue("city", "");
    };

    const countryOnChange = (e) => {
        const countryId = e.target.value;
        const countryFound = selectedRegion?.countries?.find(
            (country) => country._id === countryId
        );
        setSelectedCountry(countryFound);
        formik.setFieldValue("city", "");
    };
    const [state, setState] = useState({
        formError: false,
        dialogOpen: false,
        errorMessage: "",
        error: false,
    });
    let id;

    if (typeof window !== "undefined") {
        const search = window.location.search;
        const searchParams = new URLSearchParams(search);
        id = searchParams.get("id");
    }

    useEffect(() => {
        fetchContact();
    }, []);

    const fetchContact = async () => {
        const contact = await getContactById(id);
        console.log(contact);
        const { name, surname, email, position, company, address, channels, city, interest } =
            contact;

        const regionFound = regions.find((r) => r._id === city.country.region._id);
        setSelectedRegion(regionFound);

        const countryFound = regionFound.countries.find((c) => c._id === city.country._id);
        setSelectedCountry(countryFound);

        formikEditContact.setValues({
            name,
            surname,
            email,
            position,
            company: company._id,
            address,
            channels,
            city: city._id,
            interest,
        });
        setChannels(channels);
    };

    const router = useRouter();

    const handleDialogClose = () => {
        setState({
            ...state,
            dialogOpen: false,
        });
        router.push("/contacts");
    };

    const formikEditContact = useFormik({
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
                const response = await editContact(id, values);
                setState({
                    ...state,
                    dialogOpen: true,
                    formError: false,
                });
                return response;
            } catch (error) {
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
                console.log(error.response);
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
            <form {...props} onSubmit={formikEditContact.handleSubmit}>
                <Card>
                    <CardHeader title="New contact" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} s={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    max="10"
                                    min="3"
                                    onChange={formikEditContact.handleChange}
                                    onBlur={formikEditContact.handleBlur}
                                    required
                                    value={formikEditContact.values.name}
                                    variant="outlined"
                                    error={Boolean(
                                        formikEditContact.touched.name &&
                                            formikEditContact.errors.name
                                    )}
                                    helperText={
                                        formikEditContact.touched.name &&
                                        formikEditContact.errors.name
                                    }
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Surname"
                                    name="surname"
                                    onChange={formikEditContact.handleChange}
                                    onBlur={formikEditContact.handleBlur}
                                    required
                                    value={formikEditContact.values.surname}
                                    variant="outlined"
                                    error={Boolean(
                                        formikEditContact.touched.surname &&
                                            formikEditContact.errors.surname
                                    )}
                                    helperText={
                                        formikEditContact.touched.surname &&
                                        formikEditContact.errors.surname
                                    }
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    error={Boolean(
                                        formikEditContact.touched.email &&
                                            formikEditContact.errors.email
                                    )}
                                    fullWidth
                                    helperText={
                                        formikEditContact.touched.email &&
                                        formikEditContact.errors.email
                                    }
                                    label="Email"
                                    name="email"
                                    type="email"
                                    onChange={formikEditContact.handleChange}
                                    onBlur={formikEditContact.handleBlur}
                                    required
                                    value={formikEditContact.values.email}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    error={Boolean(
                                        formikEditContact.touched.position &&
                                            formikEditContact.errors.position
                                    )}
                                    helperText={
                                        formikEditContact.touched.position &&
                                        formikEditContact.errors.position
                                    }
                                    label="Position"
                                    name="position"
                                    //type="email"
                                    onChange={formikEditContact.handleChange}
                                    onBlur={formikEditContact.handleBlur}
                                    required
                                    value={formikEditContact.values.position}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    value={formikEditContact.values.company}
                                    error={Boolean(
                                        formikEditContact.touched.company &&
                                            formikEditContact.errors.company
                                    )}
                                    fullWidth
                                    helperText={
                                        formikEditContact.touched.company &&
                                        formikEditContact.errors.company
                                    }
                                    label="Company"
                                    name="company"
                                    select
                                    onChange={formikEditContact.handleChange}
                                    onBlur={formikEditContact.handleBlur}
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
                                <Grid item md={6} s={12}>
                                    <TextField
                                        value={selectedRegion._id}
                                        name="region"
                                        select
                                        fullWidth
                                        variant="outlined"
                                        label="Region"
                                        placeholder="Select region"
                                        onChange={regionOnChange}
                                        error={Boolean(
                                            formikEditContact.touched.region &&
                                                formikEditContact.errors.region
                                        )}
                                        helperText={
                                            formikEditContact.touched.region &&
                                            formikEditContact.errors.region
                                        }
                                    >
                                        {regions.map((region) => {
                                            return (
                                                <MenuItem value={region._id}>
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
                                        value={selectedCountry._id}
                                        variant="outlined"
                                        error={Boolean(
                                            formikEditContact.touched.country &&
                                                formikEditContact.errors.country
                                        )}
                                        helperText={
                                            formikEditContact.touched.country &&
                                            formikEditContact.errors.country
                                        }
                                    >
                                        {selectedRegion?.countries?.map((country) => {
                                            return (
                                                <MenuItem value={country._id}>
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
                                        onChange={formikEditContact.handleChange}
                                        onBlur={formikEditContact.handleBlur}
                                        required
                                        value={formikEditContact.values.city}
                                        variant="outlined"
                                        error={Boolean(
                                            formikEditContact.touched.city &&
                                                formikEditContact.errors.city
                                        )}
                                        helperText={
                                            formikEditContact.touched.city &&
                                            formikEditContact.errors.city
                                        }
                                    >
                                        {selectedCountry?.cities?.map((city) => {
                                            return (
                                                <MenuItem value={city._id}>{city.name}</MenuItem>
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
                                        onChange={formikEditContact.handleChange}
                                        onBlur={formikEditContact.handleBlur}
                                        required
                                        value={formikEditContact.values.address}
                                        variant="outlined"
                                        error={Boolean(
                                            formikEditContact.touched.address &&
                                                formikEditContact.errors.address
                                        )}
                                        helperText={
                                            formikEditContact.touched.address &&
                                            formikEditContact.errors.address
                                        }
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        value={formikEditContact.values.interest}
                                        name="interest"
                                        select="true"
                                        label="Interest"
                                        fullWidth="true"
                                        variant="outlined"
                                        onChange={(event) => {
                                            formikEditContact.setFieldValue(
                                                "interest",
                                                event.target.value
                                            );
                                        }}
                                    >
                                        {optionsInterest.map((option) => {
                                            return (
                                                <MenuItem value={option.value}>
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
                                disabled={formikEditContact.isSubmitting}
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
            {/* <CardPersonalInformation /> */}
            {/* <CardRegionInformation /> */}
            <Dialog
                open={state.dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{}</DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The contact has been edited successfully.
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
