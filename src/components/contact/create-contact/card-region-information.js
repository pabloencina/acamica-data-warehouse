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
            city: Yup.string().required("City is required"),
            address: Yup.mixed().required("Address is required"),
        }),
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
                        />
                    </Grid>
                    <Grid item md={2.5} xs={12}>
                        <TextField
                            value={formikPersonalInformation.values.city}
                            name="city"
                            select
                            label="City"
                            //placeholder="Select city"
                            fullWidth
                            variant="outlined"
                            onBlur={formikPersonalInformation.handleBlur}
                            onChange={formikPersonalInformation.handleChange}
                            error={Boolean(
                                formikPersonalInformation.touched.city &&
                                    formikPersonalInformation.errors.city
                            )}
                            helperText={
                                formikPersonalInformation.touched.city &&
                                formikPersonalInformation.errors.city
                            }
                            //inputValue={state.profileInputValue}
                            // onInputChange={(event, newInputValue) => {
                            //     setState({
                            //         ...state,
                            //         profileInputValue: newInputValue,
                            //     });
                            // }}
                        />
                    </Grid>
                    <Grid item md={2.5} xs={12}>
                        <TextField
                            fullWidth
                            label="Address"
                            name="address"
                            placeholder="Enter an address"
                            max="10"
                            min="3"
                            onChange={formikPersonalInformation.handleChange}
                            onBlur={formikPersonalInformation.handleBlur}
                            required
                            value={formikPersonalInformation.values.address}
                            variant="outlined"
                            error={Boolean(
                                formikPersonalInformation.touched.address &&
                                    formikPersonalInformation.errors.address
                            )}
                            helperText={
                                formikPersonalInformation.touched.address &&
                                formikPersonalInformation.errors.address
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
                            onChange={(event) => {
                                formikPersonalInformation.setFieldValue(
                                    "interest",
                                    event.target.value
                                );
                            }}
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
