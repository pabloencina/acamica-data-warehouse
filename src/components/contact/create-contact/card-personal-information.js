import { Card, CardContent, CardHeader, Divider, Grid, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CardPersonalInformation = () => {
    const formikPersonalInformation = useFormik({
        initialValues: {
            region: "",
            country: "",
            city: "",
            direction: "",
            interest: "75%",
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
                //.oneOf(optionsPreference, "Position must be one of the options")
                .required("Position is required"),
            company: Yup.string().max(15).min(3).required("Company is required"),
        }),

        onSubmit: async (values) => {
            try {
                const response = await postContact(values);

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
        <Card sx={{ marginLeft: -20, width: 1050 }}>
            <CardHeader title="New contact" />
            <Divider />
            <CardContent>
                <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
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
                            //initialValues
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
                                formikPersonalInformation.touched.company &&
                                    formikPersonalInformation.errors.company
                            )}
                            fullWidth
                            helperText={
                                formikPersonalInformation.touched.company &&
                                formikPersonalInformation.errors.company
                            }
                            label="Company"
                            name="company"
                            onChange={formikPersonalInformation.handleChange}
                            onBlur={formikPersonalInformation.handleBlur}
                            //type="company"
                            variant="outlined"
                            required
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <Divider />
        </Card>
    );
};

export default CardPersonalInformation;
