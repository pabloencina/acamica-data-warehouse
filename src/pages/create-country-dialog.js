import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Tooltip } from "@mui/material";
import AddLocationOutlinedIcon from "@mui/icons-material/AddLocationOutlined";
import { postCountry } from "src/services/countriesService";
import { useState } from "react";

export default function CreateCountryDialog() {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");

    const [state, setState] = React.useState({
        profileInputValue: "",
        formError: false,
        dialogOpen: false,
        errorMessage: "",
        error: false,
    });

    const handleCreateCountry = async (e) => {
        setOpen(true);
    };

    const handleClose = (e) => {
        setOpen(false);
    };

    const handleNameOnChange = (event) => {
        setName(event.target.value);
    };

    const handleConfirmedCountry = async (e) => {
        try {
            const response = await postCountry({ name });

            console.log(response);
            setState({
                ...state,
                dialogOpen: true,
                formError: false,
            });
        } catch (error) {
            let message = "Country creation failed.";
            if (error.response) {
                if (error.response.status === 400) {
                    message += " Please verify the fields in the form.";
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
        handleClose();
    };

    return (
        <div>
            <Tooltip title="Add Country" onClick={handleCreateCountry}>
                <IconButton>
                    <AddLocationOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter the name of the country</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="name"
                        fullWidth
                        value={name}
                        onChange={handleNameOnChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmedCountry}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
