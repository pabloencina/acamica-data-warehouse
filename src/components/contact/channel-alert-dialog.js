import { Grid, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { useFormik } from "formik";
import * as React from "react";
import { useState } from "react";
import * as Yup from "yup";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddChannelDialog(props) {
    const { addChannel } = props;

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

    // const [state, setState] = useState({
    //     formError: false,
    //     dialogOpen: false,
    //     errorMessage: "",
    //     error: false,
    // });

    const [state, setState] = useState({
        channel: optionsChannel[0].value,
        account: "",
        preference: optionsPreference[0].value,
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        addChannel({
            ...state,
        });
        setOpen(false);
    };

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
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            height: 250,
                            width: 400,
                            mt: 2,
                        }}
                    >
                        <Grid item md={12} xs={12}>
                            <TextField
                                name="contactChannel"
                                fullWidth
                                select
                                value={state.channel}
                                label="Contact channel"
                                variant="outlined"
                                onChange={(event) => {
                                    setState({
                                        ...state,
                                        channel: event.target.value,
                                    });
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
                                fullWidth
                                label="User account"
                                name="account"
                                placeholder="andres_diMaria@gmail.com"
                                onChange={(event) => {
                                    setState({
                                        ...state,
                                        account: event.target.value,
                                    });
                                }}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                name="preference"
                                fullWidth
                                select
                                value={state.preference}
                                label="Preference"
                                variant="outlined"
                                onChange={(event) => {
                                    setState({
                                        ...state,
                                        preference: event.target.value,
                                    });
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
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
