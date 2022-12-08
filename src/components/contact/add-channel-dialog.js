import { Grid, MenuItem, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import * as React from "react";
import { useState } from "react";
import * as ObjectID from "bson-objectid";
import { optionsChannel, optionsPreference } from "./constants";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddChannelDialog(props) {
    const { addChannel } = props;

    const [open, setOpen] = useState(false);

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
            _id: ObjectID(),
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
                                {/* <MenuItem value={"TWITTER"}>Twitter</MenuItem>
                                <MenuItem value={"INSTAGRAM"}>Instagram</MenuItem>
                                <MenuItem value={"FACEBOOK"}>Facebook</MenuItem>
                                <MenuItem value={"WHATSAPP"}>WhatsApp</MenuItem>
                                <MenuItem value={"PHONE"}>Phone</MenuItem> */}
                                {optionsChannel.map((option) => {
                                    return <MenuItem value={option.value}>{option.label}</MenuItem>;
                                })}
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
                                {optionsPreference.map((option) => {
                                    return <MenuItem value={option.value}>{option.label}</MenuItem>;
                                })}
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
