import { useState } from "react";
import { useRouter } from "next/router";
import {
    Alert,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Box,
    Drawer,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postUser } from "src/services/usersService";
import { DriveEtaRounded } from "@mui/icons-material";

export const CreateContactForm = (props) => {
    const optionsPreference = ["NO_PREFERENCE", "FAVORITE_CHANNEL", "DO_NOT_DISTURB"];
    const optionsChannel = ["TWITTER", "INSTAGRAM", "FACEBOOK", "WHATSAPP", "PHONE"];
    const optionsInterest = ["0%", "25%", "50%", "75%", "100%"];

    const [state, setState] = useState({
        profileInputValue: "",
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

    const formikPersonalInformation = useFormik({
        initialValues: {
            region: "",
            country: "",
            city: "",
            direction: "",
            contactChannel: "",
            userAccount: "",
            preferences: "",
        },

        validationSchema: Yup.object({
            name: Yup.string().max(10).min(3).required("Name is required"),
            surname: Yup.string().max(15).min(3).required("Surname is required"),
            email: Yup.string()
                .email("Must be a valid email")
                .max(40)
                .min(10)
                .required("Email is required"),
            position: Yup.mixed()
                .oneOf(optionsPreference, "Position must be one of the options")
                .required("Profile is required"),
            company: Yup.string().max(15).min(3).required("Company is required"),
        }),

        onSubmit: async (values) => {
            try {
                const response = await postUser(values);

                //console.log(response);
                setState({
                    ...state,
                    dialogOpen: true,
                    formError: false,
                });
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
            <form {...props} onSubmit={formikPersonalInformation.handleSubmit}>
                <Card sx={{ marginLeft: -20, width: 1050 }}>
                    <CardHeader title="New contact" />
                    <Divider />
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <Grid item md={2} s={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    max="10"
                                    min="3"
                                    onChange={formikPersonalInformation.handleChange}
                                    onBlur={formikPersonalInformation.handleBlur}
                                    required
                                    value={formikPersonalInformation.values.name}
                                    variant="outlined"
                                    error={Boolean(
                                        formikPersonalInformation.touched.name &&
                                            formikPersonalInformation.errors.name
                                    )}
                                    helperText={
                                        formikPersonalInformation.touched.name &&
                                        formikPersonalInformation.errors.name
                                    }
                                />
                            </Grid>
                            <Grid item md={2} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Surname"
                                    name="surname"
                                    initialValues
                                    onBlur={formikPersonalInformation.handleBlur}
                                    required
                                    value={formikPersonalInformation.values.surname}
                                    variant="outlined"
                                    error={Boolean(
                                        formikPersonalInformation.touched.surname &&
                                            formikPersonalInformation.errors.surname
                                    )}
                                    helperText={
                                        formikPersonalInformation.touched.surname &&
                                        formikPersonalInformation.errors.surname
                                    }
                                />
                            </Grid>
                            <Grid item md={2} xs={12}>
                                <TextField
                                    error={Boolean(
                                        formikPersonalInformation.touched.email &&
                                            formikPersonalInformation.errors.email
                                    )}
                                    fullWidth
                                    helperText={
                                        formikPersonalInformation.touched.email &&
                                        formikPersonalInformation.errors.email
                                    }
                                    label="Email"
                                    name="email"
                                    type="email"
                                    onChange={formikPersonalInformation.handleChange}
                                    onBlur={formikPersonalInformation.handleBlur}
                                    required
                                    value={formikPersonalInformation.values.email}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={2} xs={12}>
                                <TextField
                                    error={Boolean(
                                        formikPersonalInformation.touched.position &&
                                            formikPersonalInformation.errors.position
                                    )}
                                    fullWidth
                                    helperText={
                                        formikPersonalInformation.touched.position &&
                                        formikPersonalInformation.errors.position
                                    }
                                    label="Position"
                                    name="position"
                                    //type="email"
                                    onChange={formikPersonalInformation.handleChange}
                                    onBlur={formikPersonalInformation.handleBlur}
                                    required
                                    value={formikPersonalInformation.values.position}
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item md={2} xs={12}>
                                <TextField
                                    error={Boolean(
                                        formikPersonalInformation.touched.password &&
                                            formikPersonalInformation.errors.password
                                    )}
                                    fullWidth
                                    helperText={
                                        formikPersonalInformation.touched.password &&
                                        formikPersonalInformation.errors.password
                                    }
                                    label="Company"
                                    name="company"
                                    onChange={formikPersonalInformation.handleChange}
                                    onBlur={formikPersonalInformation.handleBlur}
                                    //type="company"
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                </Card>
                <Divider />

                <Card sx={{ marginLeft: -20, width: 1050 }}>
                    <Divider />
                    <Divider />
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                            sx={{ display: "flex", justifyContent: "center" }}
                        >
                            <Grid item md={2.5} s={12}>
                                <Autocomplete
                                    value={formikPersonalInformation.values.region}
                                    name="region"
                                    fullWidth
                                    variant="outlined"
                                    onBlur={formikPersonalInformation.handleBlur}
                                    onChange={(e, value) =>
                                        formikPersonalInformation.setFieldValue("region", value)
                                    }
                                    inputValue={state.profileInputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setState({
                                            ...state,
                                            profileInputValue: newInputValue,
                                        });
                                    }}
                                    options={optionsPreference}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={Boolean(formikPersonalInformation.errors.region)}
                                            helperText={formikPersonalInformation.errors.region}
                                            label="Region"
                                            placeholder="Select region"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={2.5} xs={12}>
                                <Autocomplete
                                    value={formikPersonalInformation.values.country}
                                    name="country"
                                    fullWidth
                                    variant="outlined"
                                    onBlur={formikPersonalInformation.handleBlur}
                                    onChange={(e, value) =>
                                        formikPersonalInformation.setFieldValue("country", value)
                                    }
                                    inputValue={state.profileInputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setState({
                                            ...state,
                                            profileInputValue: newInputValue,
                                        });
                                    }}
                                    options={optionsPreference}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={Boolean(
                                                formikPersonalInformation.errors.country
                                            )}
                                            helperText={formikPersonalInformation.errors.country}
                                            label="Country"
                                            placeholder="Select country"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={2.5} xs={12}>
                                <Autocomplete
                                    value={formikPersonalInformation.values.city}
                                    name="city"
                                    fullWidth
                                    variant="outlined"
                                    onBlur={formikPersonalInformation.handleBlur}
                                    onChange={(e, value) =>
                                        formikPersonalInformation.setFieldValue("city", value)
                                    }
                                    inputValue={state.profileInputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setState({
                                            ...state,
                                            profileInputValue: newInputValue,
                                        });
                                    }}
                                    options={optionsPreference}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={Boolean(formikPersonalInformation.errors.city)}
                                            helperText={formikPersonalInformation.errors.city}
                                            label="City"
                                            placeholder="Select city"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={2.5} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Direction"
                                    name="direction"
                                    placeholder="Enter an address"
                                    max="10"
                                    min="3"
                                    onChange={formikPersonalInformation.handleChange}
                                    onBlur={formikPersonalInformation.handleBlur}
                                    required
                                    value={formikPersonalInformation.values.direction}
                                    variant="outlined"
                                    error={Boolean(
                                        formikPersonalInformation.touched.direction &&
                                            formikPersonalInformation.errors.direction
                                    )}
                                    helperText={
                                        formikPersonalInformation.touched.direction &&
                                        formikPersonalInformation.errors.direction
                                    }
                                />
                            </Grid>
                            <Grid item md={2.5} xs={12}>
                                <Autocomplete
                                    value={formikPersonalInformation.values.city}
                                    name="interest"
                                    fullWidth
                                    variant="outlined"
                                    onBlur={formikPersonalInformation.handleBlur}
                                    onChange={(e, value) =>
                                        formikPersonalInformation.setFieldValue("interest", value)
                                    }
                                    inputValue={state.profileInputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setState({
                                            ...state,
                                            profileInputValue: newInputValue,
                                        });
                                    }}
                                    options={optionsInterest}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={Boolean(
                                                formikPersonalInformation.errors.interest
                                            )}
                                            helperText={formikPersonalInformation.errors.interest}
                                            label="Interest"
                                        />
                                    )}
                                />
                            </Grid>
                            <Divider />
                            <Grid item md={3} xs={12}>
                                <Autocomplete
                                    value={formikPersonalInformation.values.contactChannel}
                                    name="contactChannel"
                                    fullWidth
                                    variant="outlined"
                                    onBlur={formikPersonalInformation.handleBlur}
                                    onChange={(e, value) =>
                                        formikPersonalInformation.setFieldValue(
                                            "contactChannel",
                                            value
                                        )
                                    }
                                    inputValue={state.profileInputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setState({
                                            ...state,
                                            profileInputValue: newInputValue,
                                        });
                                    }}
                                    options={optionsChannel}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={Boolean(
                                                formikPersonalInformation.errors.contactChannel
                                            )}
                                            helperText={
                                                formikPersonalInformation.errors.contactChannel
                                            }
                                            label="Contact channel"
                                            placeholder="Select channel"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <TextField
                                    error={Boolean(
                                        formikPersonalInformation.touched.userAccount &&
                                            formikPersonalInformation.errors.userAccount
                                    )}
                                    fullWidth
                                    helperText={
                                        formikPersonalInformation.touched.userAccount &&
                                        formikPersonalInformation.errors.userAccount
                                    }
                                    label="User account"
                                    name="userAccount"
                                    placeholder="andres_diMaria@gmail.com"
                                    onChange={formikPersonalInformation.handleChange}
                                    onBlur={formikPersonalInformation.handleBlur}
                                    //type="password"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <Autocomplete
                                    value={formikPersonalInformation.values.preferences}
                                    name="preferences"
                                    fullWidth
                                    variant="outlined"
                                    onBlur={formikPersonalInformation.handleBlur}
                                    onChange={(e, value) =>
                                        formikPersonalInformation.setFieldValue(
                                            "preferences",
                                            value
                                        )
                                    }
                                    inputValue={state.profileInputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setState({
                                            ...state,
                                            profileInputValue: newInputValue,
                                        });
                                    }}
                                    options={optionsPreference}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={Boolean(
                                                formikPersonalInformation.errors.preferences
                                            )}
                                            helperText={
                                                formikPersonalInformation.errors.preferences
                                            }
                                            label="Preferences"
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            p: 2,
                        }}
                    >
                        <Button
                            color="primary"
                            disabled={formikPersonalInformation.isSubmitting}
                            variant="contained"
                            underline="hover"
                            type="submit"
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            disabled={formikPersonalInformation.isSubmitting}
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
                        The user has been created successfully.
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
