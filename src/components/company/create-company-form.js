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
import { postCompany } from "src/services/companiesService";
import { AppContext } from "src/utils/app-context-provider";
import * as Yup from "yup";

export const CreateCompanyForm = (props) => {
    const { regions } = useContext(AppContext);

    const [selectedRegion, setSelectedRegion] = useState({
        _id: "",
        countries: [],
    });
    const [selectedCountry, setSelectedCountry] = useState({
        _id: "",
        cities: [],
    });
    // const [selectedCity, setSelectedCity] = useState({});

    const regionOnChange = (e) => {
        const regionId = e.target.value;
        const regionFound = regions.find((region) => region._id === regionId);
        setSelectedRegion(regionFound);
        setSelectedCountry({
            cities: [],
        });
        // setSelectedCity({});
    };

    const countryOnChange = (e) => {
        const countryId = e.target.value;
        const countryFound = selectedRegion?.countries?.find(
            (country) => country._id === countryId
        );
        setSelectedCountry(countryFound);
        // setSelectedCity({});
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
        router.push("/companies");
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            address: "",
            email: "",
            phone: "",
            city: "",
        },

        validationSchema: Yup.object({
            name: Yup.string().max(10).min(3).required("Name is required"),
            address: Yup.string().max(15).min(3).required("Address is required"),
            email: Yup.string()
                .email("Must be a valid email")
                .max(40)
                .min(10)
                .required("Email is required"),
            phone: Yup.mixed().required("Phone is required"),
            city: Yup.string().required("City is required"),
        }),

        onSubmit: async (values) => {
            try {
                const response = await postCompany(values);
                setState({
                    ...state,
                    dialogOpen: true,
                    formError: false,
                });
            } catch (error) {
                console.log(error);
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
            <form {...props} onSubmit={formik.handleSubmit}>
                <Card>
                    <CardHeader title="Company" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} s={12}>
                                <TextField
                                    fullWidth
                                    label="Company name"
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
                                    label="Region"
                                    name="region"
                                    select
                                    onChange={regionOnChange}
                                    //onBlur={formik.handleBlur}
                                    required
                                    value={formik.values.region}
                                    variant="outlined"
                                    error={Boolean(formik.touched.region && formik.errors.region)}
                                    helperText={formik.touched.region && formik.errors.region}
                                >
                                    {regions.map((region) => {
                                        return (
                                            <MenuItem value={region._id}>{region.name}</MenuItem>
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
                                    //onChange={formik.handleChange}
                                    //onBlur={formik.handleBlur}
                                    required
                                    value={formik.values.country}
                                    variant="outlined"
                                    error={Boolean(formik.touched.country && formik.errors.country)}
                                    helperText={formik.touched.country && formik.errors.country}
                                >
                                    {selectedRegion?.countries?.map((country) => {
                                        return (
                                            <MenuItem value={country._id}>{country.name}</MenuItem>
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
                                    {selectedCountry?.cities?.map((city) => {
                                        return <MenuItem value={city._id}>{city.name}</MenuItem>;
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
                            Create
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
                        The company has been created successfully.
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
