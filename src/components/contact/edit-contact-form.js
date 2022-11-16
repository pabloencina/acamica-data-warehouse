import { useEffect, useState } from "react";
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
import { editContact, getContactById } from "src/services/contactsService";

const EditContactForm = (props) => {
    // TODO: Las props llegan vacías. Hay que buscar una forma de, al moverse a una pagina nueva, enviarle los datos a esa nueva página, para que no tenga que ir al backend a buscarlos nuevamente: useRouter de React*
    // TODO: Si lo anterior no se puede, hay que llamar de nuevo al Back End y pedirle los datos, tomando el ID que aparece en la URL.
    const options = ["ADMIN", "BASIC"];
    const [state, setState] = useState({
        profileInputValue: "",
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
        getContactById(id).then((user) => {
            const { name, surname, password, email, profile } = user;
            formik.setValues({ name, surname, password, profile, email });
        });
    }, []);

    const router = useRouter();

    const handleDialogClose = () => {
        setState({
            ...state,
            dialogOpen: false,
        });
        router.push("/contacts");
    };

    const formik = useFormik({
        initialValues: {
            contact: "",
            position: "",
            company: "",
            address: "",
            channels: "",
            interest: "",
        },

        validationSchema: Yup.object({
            contact: Yup.string().max(10).min(3).required("Contact is required"),
            position: Yup.string().max(15).min(3).required("Position is required"),
            company: Yup.string().required("Company is required"),
            address: Yup.mixed().required("Address is required"),
            channels: Yup.string().max(15).min(3).required("Channels is required"),
            interest: Yup.string().max(15).min(3).required("Interest is required"),
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
            <form {...props} onSubmit={formik.handleSubmit}>
                <Card>
                    <CardHeader title="Profile" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Contact"
                                    name="contact"
                                    max="10"
                                    min="3"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    value={formik.values.contact}
                                    variant="outlined"
                                    error={Boolean(formik.touched.contact && formik.errors.contact)}
                                    helperText={formik.touched.contact && formik.errors.contact}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Position"
                                    name="position"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    value={formik.values.position}
                                    variant="outlined"
                                    error={Boolean(
                                        formik.touched.position && formik.errors.position
                                    )}
                                    helperText={formik.touched.position && formik.errors.position}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    error={Boolean(formik.touched.company && formik.errors.company)}
                                    fullWidth
                                    helperText={formik.touched.company && formik.errors.company}
                                    label="Company"
                                    name="company"
                                    //type="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                    value={formik.values.company}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Autocomplete
                                    value={formik.values.address}
                                    name="address"
                                    fullWidth
                                    variant="outlined"
                                    onBlur={formik.handleBlur}
                                    onChange={(e, value) => formik.setFieldValue("address", value)}
                                    inputValue={state.profileInputValue}
                                    onInputChange={(e, newInputValue) => {
                                        setState({
                                            ...state,
                                            profileInputValue: newInputValue,
                                        });
                                    }}
                                    options={options}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={Boolean(formik.errors.address)}
                                            helperText={formik.errors.address}
                                            label="Address"
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    error={Boolean(formik.touched.channel && formik.errors.channel)}
                                    value={formik.values.channel}
                                    fullWidth
                                    helperText={formik.touched.channel && formik.errors.channel}
                                    label="Channel"
                                    name="channel"
                                    //type="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    error={Boolean(
                                        formik.touched.interest && formik.errors.interest
                                    )}
                                    value={formik.values.interest}
                                    fullWidth
                                    helperText={formik.touched.interest && formik.errors.interest}
                                    label="Interest"
                                    name="interest"
                                    //type="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
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

export default EditContactForm;
