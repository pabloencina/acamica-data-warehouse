import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function CreateRegionDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                sx={{ m: 1 }}
                color="primary"
                variant="contained"
                onClick={() => {
                    handleClickOpen();
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
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={{}}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
