import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { postRegion } from "src/services/regionsService";
import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function EditCityDialog(props) {
    const { refreshRegions } = props;

    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState("");

    const [state, setState] = React.useState({
        profileInputValue: "",
        formError: false,
        errorMessage: "",
        error: false,
    });

    const handleNameOnChange = (event) => {
        setName(event.target.value);
    };

    const handleEditCity = (event) => {
        setOpen(true);
    };

    const handleClose = (event) => {
        setOpen(false);
    };

    const handleConfirmedCountry = async (event) => {
        try {
            const response = await postRegion({ name });

            setState({
                ...state,
                formError: false,
            });
        } catch (error) {
            let message = "Region creation failed.";
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
        refreshRegions();
    };

    return (
        <div>
            <Tooltip title="Edit City" onClick={handleEditCity}>
                <IconButton>
                    <EditOutlinedIcon fontSize="big" />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit the name of the city </DialogTitle>
                <DialogContent>
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
