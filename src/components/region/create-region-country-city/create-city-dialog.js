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
import { postCity } from "src/services/citiesService";
import { useState } from "react";

export default function CreateCityDialog(props) {
    const { refreshRegions, countryId } = props;
    console.log(refreshRegions);
    const [open, setOpen] = React.useState(false);
    const [cityName, setCityName] = useState("");

    const [state, setState] = React.useState({
        profileInputValue: "",
        formError: false,
        errorMessage: "",
        error: false,
    });

    const handleCreateCity = async (e) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNameOnChange = (event) => {
        setCityName(event.target.value);
    };

    const handleConfirmedCity = async (values) => {
        console.log(values);
        try {
            const response = await postCity({ name: cityName, country: countryId });

            console.log(response);
            setState({
                ...state,
                formError: false,
            });
        } catch (error) {
            let message = "City creation failed.";
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
            <Tooltip title="Add City" onClick={handleCreateCity}>
                <IconButton>
                    <AddLocationOutlinedIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter the name of the city</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="name"
                        fullWidth
                        value={cityName}
                        onChange={handleNameOnChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmedCity}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
