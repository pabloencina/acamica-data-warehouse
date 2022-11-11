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

export default function CreateCountryDialog(props) {
    const { regionId, refreshRegions } = props;
    const [open, setOpen] = React.useState(false);
    const [countryName, setCountryName] = useState("");

    const [state, setState] = React.useState({
        profileInputValue: "",
        formError: false,
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
        setCountryName(event.target.value);
    };

    const handleConfirmedCountry = async (event) => {
        try {
            const response = await postCountry({ name: countryName, region: regionId });
            console.log(response);
            setState({
                ...state,
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
        refreshRegions();
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
                        value={countryName}
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
