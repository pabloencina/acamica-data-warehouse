import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton, Tooltip } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import * as React from "react";
import { deleteContact } from "src/services/contactsService";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertDeleteContact(params) {
    const { contact, onContactDeleted } = params;

    const [open, setOpen] = React.useState(false);

    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSnackbarOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async (e) => {
        try {
            await deleteContact(contact._id); //Elimina un usuario por ID
            onContactDeleted();
        } catch (error) {
            setSnackbarOpen(true);
        }

        handleClose();
    };

    return (
        <>
            <Tooltip title="Delete Contact">
                <IconButton
                    onClick={() => {
                        handleClickOpen();
                    }}
                >
                    <DeleteOutlineIcon />
                </IconButton>
            </Tooltip>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"></DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete {contact.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>

                    <Button onClick={handleDelete} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
                    Cannot delete contact {contact.name}.
                </Alert>
            </Snackbar>
        </>
    );
}
