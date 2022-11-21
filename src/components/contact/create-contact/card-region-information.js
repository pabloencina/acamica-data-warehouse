import { Box, Button, Card, CardContent, Divider, Grid, MenuItem, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import AddChannelDialog from "../channel-alert-dialog";
import TableAddChannels from "../table-add-channels";

const CardRegionInformation = () => {
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
    const [state, setState] = useState({
        profileInputValue: "",
        formError: false,
        dialogOpen: false,
        errorMessage: "",
        error: false,
    });
    const formikPersonalInformation = useFormik({
        initialValues: {
            region: "",
            country: "",
            city: "",
            address: "",
            interest: optionsInterest[2].value,
        },

        // toDo cambiar validacion.
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

        // onSubmit: async (values) => {
        //     try {
        //         const response = await postContact(values);

        //         //console.log(response);
        //         setState({
        //             ...state,
        //             dialogOpen: true,
        //             formError: false,
        //         });
        //     } catch (error) {
        //         let message = "Contact creation failed.";
        //         if (error.response) {
        //             if (error.response.status === 400) {
        //                 message += " Please verify the fields in the form.";
        //             } else if (error.response.status === 409) {
        //                 message += " The email already exists in the database.";
        //             } else if (error.response.status === 500) {
        //                 message += " There's issues in the server. Please try again later...";
        //             }
        //         } else {
        //             message += " Can't connect with the server. Please try again later...";
        //         }
        //         console.log(error.response);
        //         setState({
        //             ...state,
        //             errorMessage: message,
        //             formError: true,
        //         });
        //     }
        // },
    });
    return (
        <Card sx={{ marginLeft: -20, width: 1050 }}>
            <Divider />
            <Divider />
            <CardContent>
                <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
                    <Grid item md={2.5} s={12}>
                        <TextField
                            value={formikPersonalInformation.values.region}
                            name="region"
                            select="true"
                            fullWidth="true"
                            variant="outlined"
                            label="Region"
                            placeholder="Select region"
                            //onBlur={formikPersonalInformation.handleBlur}
                            onChange={(event) =>
                                formikPersonalInformation.setFieldValue(
                                    "region",
                                    event.target.value
                                )
                            }
                            inputValue={state.profileInputValue}
                            onInputChange={(event, newInputValue) => {
                                setState({
                                    ...state,
                                    profileInputValue: newInputValue,
                                });
                            }}
                            // renderInput={(params) => (
                            //     <TextField
                            //         {...params}
                            //         error={Boolean(formikPersonalInformation.errors.region)}
                            //         helperText={formikPersonalInformation.errors.region}
                            //         label="Region"
                            //         placeholder="Select region"
                            //     />
                            // )}
                        />
                    </Grid>
                    <Grid item md={2.5} xs={12}>
                        <TextField
                            value={formikPersonalInformation.values.country}
                            name="country"
                            select
                            label="Country"
                            placeholder="Select country"
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
                            // renderInput={(params) => (
                            //     <TextField
                            //         {...params}
                            //         error={Boolean(formikPersonalInformation.errors.country)}
                            //         helperText={formikPersonalInformation.errors.country}
                            //         label="Country"
                            //         placeholder="Select country"
                            //     />
                            // )}
                        />
                    </Grid>
                    <Grid item md={2.5} xs={12}>
                        <TextField
                            value={formikPersonalInformation.values.city}
                            name="city"
                            select
                            label="City"
                            placeholder="Select city"
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
                            // renderInput={(params) => (
                            //     <TextField
                            //         {...params}
                            //         error={Boolean(formikPersonalInformation.errors.city)}
                            //         helperText={formikPersonalInformation.errors.city}
                            //         label="City"
                            //         placeholder="Select city"
                            //     />
                            // )}
                        />
                    </Grid>
                    <Grid item md={2.5} xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="direction"
                            placeholder="Enter an address"
                            max="10"
                            min="3"
                            onChange={formikPersonalInformation.handleChange}
                            onBlur={formikPersonalInformation.handleBlur}
                            //required
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
                        <TextField
                            value={formikPersonalInformation.values.interest}
                            name="interest"
                            select="true"
                            label="Interest"
                            fullWidth="true"
                            variant="outlined"
                            //onBlur={formikPersonalInformation.handleBlur}
                            onChange={(event) => {
                                formikPersonalInformation.setFieldValue(
                                    "interest",
                                    event.target.value
                                );
                            }}
                            //inputValue={state.profileInputValue}
                            // onInputChange={(event, newInputValue) => {
                            //     setState({
                            //         ...state,
                            //         profileInputValue: newInputValue,
                            //     });
                            // }}
                            //options={optionsInterest}
                            // renderInput={(params) => (
                            //     <TextField
                            //         {...params}
                            //         error={Boolean(formikPersonalInformation.errors.interest)}
                            //         helperText={formikPersonalInformation.errors.interest}
                            //         label="Interest"
                            //     />
                            // )}
                        >
                            {optionsInterest.map((option) => {
                                return <MenuItem value={option.value}>{option.label}</MenuItem>;
                            })}
                        </TextField>
                    </Grid>
                    <Divider />
                </Grid>
            </CardContent>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "end", mr: 15, mt: 2 }}>
                <AddChannelDialog />
            </Box>
            <Box sx={{ mt: 2 }}>
                <TableAddChannels />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "end",
                    p: 5,
                }}
            >
                <Button
                    sx={{}}
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
    );
};

export default CardRegionInformation;
