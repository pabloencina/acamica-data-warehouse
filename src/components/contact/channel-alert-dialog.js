import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { Autocomplete, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChannelAlertDialog() {
    const optionsPreference = ["No_Preference", "Favorite_Channel", "Do_Not_Disturb"];
    const optionsChannel = ["Twitter", "Instagram", "Facebook", "WhatsApp", "Phone"];

    const [open, setOpen] = useState(false);

    const [state, setState] = useState({
        profileInputValue: "",
        formError: false,
        dialogOpen: false,
        errorMessage: "",
        error: false,
    });

    const inputChange = (event, newInputValue) => {
        setState({
            ...state,
            profileInputValue: newInputValue,
        });
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formikPersonalInformation = useFormik({
        initialValues: {
            region: "",
            country: "",
            city: "",
            direction: "",
            interest: "75%",
            contactChannel: "Twitter",
            userAccount: "",
            preferences: "Favorite_Channel",
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
                .required("Position is required"),
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
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Channel
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <Grid
                        container
                        sx={{ display: "flex", justifyContent: "space-between", height: 450 }}
                    >
                        <Grid item md={12} xs={12}>
                            <Autocomplete
                                value={formikPersonalInformation.values.contactChannel}
                                name="contactChannel"
                                fullWidth
                                variant="outlined"
                                onBlur={formikPersonalInformation.handleBlur}
                                onChange={(e, value) =>
                                    formikPersonalInformation.setFieldValue("contactChannel", value)
                                }
                                //inputValue={inputChange}
                                options={optionsChannel}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={Boolean(
                                            formikPersonalInformation.errors.contactChannel
                                        )}
                                        helperText={formikPersonalInformation.errors.contactChannel}
                                        label="Contact channel"
                                        placeholder="Select channel"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
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
                        <Grid item md={12} xs={12}>
                            <Autocomplete
                                value={formikPersonalInformation.values.preferences}
                                name="preferences"
                                fullWidth
                                variant="outlined"
                                onBlur={formikPersonalInformation.handleBlur}
                                onChange={(e, value) =>
                                    formikPersonalInformation.setFieldValue("preferences", value)
                                }
                                inputValue={state.profileInputValue}
                                onInputChange={inputChange}
                                options={optionsPreference}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={Boolean(
                                            formikPersonalInformation.errors.preferences
                                        )}
                                        helperText={formikPersonalInformation.errors.preferences}
                                        label="Preferences"
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
