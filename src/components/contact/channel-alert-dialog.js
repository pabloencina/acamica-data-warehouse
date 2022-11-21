import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { Autocomplete, Grid, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddChannelDialog() {
    const optionsPreference = [
        {
            value: "NO_PREFERENCE",
            label: "No Preference",
        },
        {
            value: "FAVORITE_CHANNEL",
            label: "Favorite Channel",
        },
        {
            value: "DO_NOT_DISTURB",
            label: "Don't Disturb",
        },
    ];
    const optionsChannel = [
        {
            value: "TWITTER",
            label: "Twitter",
        },
        {
            value: "INSTAGRAM",
            label: "Instagram",
        },
        {
            value: "FACEBOOK",
            label: "Facebook",
        },
        {
            value: "WHATSAPP",
            label: "WhatsApp",
        },
        {
            value: "PHONE",
            label: "Phone",
        },
    ];

    const [open, setOpen] = useState(false);

    const [state, setState] = useState({
        formError: false,
        dialogOpen: false,
        errorMessage: "",
        error: false,
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formikContactChannel = useFormik({
        initialValues: {
            channel: optionsChannel[0].value,
            userAccount: "",
            preference: optionsPreference[0].value,
        },

        validationSchema: Yup.object({
            userAccount: Yup.string().max(10).min(3).required("User account is required"),
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
                            <TextField
                                // labelId="contact-channel-preference"
                                // id="contact-channel-preference"
                                name="contactChannel"
                                fullWidth="true"
                                select="true"
                                value={formikContactChannel.values.channel}
                                label="Contact channel"
                                variant="outlined"
                                //onBlur={formikContactChannel.handleBlur}
                                onChange={(event) => {
                                    formikContactChannel.setFieldValue(
                                        "contactChannel",
                                        event.target.value
                                    );
                                }}
                            >
                                <MenuItem value={"TWITTER"}>Twitter</MenuItem>
                                <MenuItem value={"INSTAGRAM"}>Instagram</MenuItem>
                                <MenuItem value={"FACEBOOK"}>Facebook</MenuItem>
                                <MenuItem value={"WHATSAPP"}>WhatsApp</MenuItem>
                                <MenuItem value={"PHONE"}>Phone</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                error={Boolean(
                                    formikContactChannel.touched.userAccount &&
                                        formikContactChannel.errors.userAccount
                                )}
                                fullWidth
                                helperText={
                                    formikContactChannel.touched.userAccount &&
                                    formikContactChannel.errors.userAccount
                                }
                                label="User account"
                                name="userAccount"
                                placeholder="andres_diMaria@gmail.com"
                                onChange={formikContactChannel.handleChange}
                                onBlur={formikContactChannel.handleBlur}
                                //type="password"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                // labelId="contact-channel-preference"
                                // id="contact-channel-preference"
                                name="preference"
                                fullWidth="true"
                                select="true"
                                value={formikContactChannel.values.preference}
                                label="Preference"
                                variant="outlined"
                                // onBlur={formikContactChannel.handleBlur}
                                onChange={(event) => {
                                    formikContactChannel.setFieldValue(
                                        "preference",
                                        event.target.value
                                    );
                                }}
                            >
                                <MenuItem value={"NO_PREFERENCE"}>No Preference</MenuItem>
                                <MenuItem value={"FAVORITE_CHANNEL"}>Favorite Channel</MenuItem>
                                <MenuItem value={"DO_NOT_DISTURB"}>Don't Disturb</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ p: 1 }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
    33;
}
