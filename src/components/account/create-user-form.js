import { useState } from "react";
import { useRouter } from "next/router";
import {
    Alert,
    Box,
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
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postUser } from "src/services/usersService";

export const CreateUserForm = () => {
    const options = ["ADMIN", "BASIC"];
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
        router.push("/users");
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            email: "",
            profile: "BASIC",
            password: "",
        },

        validationSchema: Yup.object({
            name: Yup.string().max(10).min(3).required("Name is required"),
            surname: Yup.string().max(15).min(3).required("Surname is required"),
            email: Yup.string()
                .email("Must be a valid email")
                .max(40)
                .min(10)
                .required("Email is required"),
            profile: Yup.mixed()
                .oneOf(options, "Profile must be one of the options")
                .required("Profile is required"),
            password: Yup.string().max(15).min(3).required("Password is required"),
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
                let message = "User creation failed.";
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
                            <Grid item md={6} s={12}>
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
                                    fullWidth
                                    label="Surname"
                                    name="surname"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    value={formik.values.surname}
                                    variant="outlined"
                                    error={Boolean(formik.touched.surname && formik.errors.surname)}
                                    helperText={formik.touched.surname && formik.errors.surname}
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
                                <Autocomplete
                                    value={formik.values.profile}
                                    name="profile"
                                    fullWidth
                                    variant="outlined"
                                    onBlur={formik.handleBlur}
                                    onChange={(e, value) => formik.setFieldValue("profile", value)}
                                    inputValue={state.profileInputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setState({
                                            ...state,
                                            profileInputValue: newInputValue,
                                        });
                                    }}
                                    options={options}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={Boolean(formik.errors.profile)}
                                            helperText={formik.errors.profile}
                                            label="Profile"
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    error={Boolean(
                                        formik.touched.password && formik.errors.password
                                    )}
                                    fullWidth
                                    helperText={formik.touched.password && formik.errors.password}
                                    label="Password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    type="password"
                                    variant="outlined"
                                />
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
