import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteCompany, getAllCompanies } from "src/services/companiesService";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertDeleteCompany(params) {
    console.log(params);
    const { company, setCompanies } = params;

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
        deleteCompany(company._id) //Elimina un usuario por ID
            .then(() => {
                getAllCompanies().then((response) => {
                    // Trae a todos los usuarios.

                    setCompanies(response.data); // Modifica la lista trayendo a todos los usuarios menos el usuario eliminado
                });
            })
            .catch((e) => {
                //console.log("se produjo un error al eliminar el usuario");
                setSnackbarOpen(true);
                // TODO: mostrar un toast en caso de error
            });
        handleClose();
    };

    return (
        <>
            <Tooltip title="Delete Company">
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
                        Are you sure you want to delete {company.name}?
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
                    Cannot delete user {company.name}
                </Alert>
            </Snackbar>
        </>
    );
}
