import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { postRegion } from "src/services/regionsService";
import { useState } from "react";

export default function CreateRegionDialog(props) {
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

    const handleCreateRegion = (event) => {
        setOpen(true);
    };

    const handleClose = (event) => {
        setOpen(false);
    };

    const handleConfirmedRegion = async (event) => {
        try {
            const response = await postRegion({ name });

            console.log(response);
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
            <Button
                sx={{ m: 1 }}
                color="primary"
                variant="contained"
                onClick={(event) => {
                    handleCreateRegion(event);
                }}
            >
                Add Region
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter the name of the region</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="name"
                        fullWidth
                        //variant="standard"
                        value={name}
                        onChange={handleNameOnChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirmedRegion}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
