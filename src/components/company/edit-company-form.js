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
import { editCompany, getCompanyById } from "src/services/companiesService";
import { AppContext } from "src/utils/app-context-provider";
import * as Yup from "yup";

export const EditCompanyForm = () => {
    const { regions } = useContext(AppContext);

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
            _id: "",
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

    const fetchCompany = async () => {
        const company = await getCompanyById(id);
        const { name, email, phone, address, city } = company;

        const regionFound = regions.find((r) => r._id === city.country.region._id);
        setSelectedRegion(regionFound);

        const countryFound = regionFound.countries.find((c) => c._id === city.country._id);
        setSelectedCountry(countryFound);

        formik.setValues({ name, email, phone, address, city: city._id });
    };

    useEffect(() => {
        if (regions.length) {
            fetchCompany();
        }
    }, [regions]);

    const router = useRouter();

    const handleDialogClose = () => {
        setState({
            ...state,
            dialogOpen: false,
        });
        router.push("/companies");
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
        },

        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),

            email: Yup.string()
                .email("Must be a valid email")
                .max(40)
                .min(10)
                .required("Email is required"),
            phone: Yup.string().required("Phone is required"),
            address: Yup.mixed()
                //.oneOf(options, "Address must be one of the options")
                .required("Address is required"),
            city: Yup.string().required("City is required"),
        }),

        onSubmit: async (values) => {
            try {
                const response = await editCompany(id, values);

                setState({
                    ...state,
                    dialogOpen: true,
                    formError: false,
                });

                return response;
            } catch (error) {
                let message = "Company creation failed.";
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
            <form onSubmit={formik.handleSubmit}>
                <Card>
                    <CardHeader title="Profile" />
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    value={formik.values.name}
                                    variant="outlined"
                                    error={Boolean(formik.touched.name && formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    error={Boolean(formik.touched.email && formik.errors.email)}
                                    fullWidth
                                    helperText={formik.touched.email && formik.errors.email}
                                    label="Email"
                                    name="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    value={formik.values.email}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    value={formik.values.phone}
                                    variant="outlined"
                                    error={Boolean(formik.touched.phone && formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    name="address"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    value={formik.values.address}
                                    variant="outlined"
                                    error={Boolean(formik.touched.address && formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Region"
                                    name="region"
                                    select
                                    onChange={regionOnChange}
                                    required
                                    value={selectedRegion._id}
                                    variant="outlined"
                                    error={Boolean(formik.touched.region && formik.errors.region)}
                                    helperText={formik.touched.region && formik.errors.region}
                                >
                                    {regions.map((region) => {
                                        return (
                                            <MenuItem key={region._id} value={region._id}>
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
                                    error={Boolean(formik.touched.country && formik.errors.country)}
                                    helperText={formik.touched.country && formik.errors.country}
                                >
                                    {selectedRegion.countries.map((country) => {
                                        return (
                                            <MenuItem key={country._id} value={country._id}>
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    value={formik.values.city}
                                    variant="outlined"
                                    error={Boolean(formik.touched.city && formik.errors.city)}
                                    helperText={formik.touched.city && formik.errors.city}
                                >
                                    {selectedCountry.cities.map((city) => {
                                        return (
                                            <MenuItem key={city._id} value={city._id}>
                                                {city.name}
                                            </MenuItem>
                                        );
                                    })}
                                </TextField>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            p: 2,
                        }}
                    >
                        <Button
                            color="primary"
                            disabled={formik.isSubmitting}
                            variant="contained"
                            underline="hover"
                            type="submit"
                        >
                            Save
                        </Button>
                    </Box>
                </Card>
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
                        The company has been edited successfully.
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
