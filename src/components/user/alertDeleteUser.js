import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteUser, getAllUsers } from "src/services/usersService";

export default function AlertDeleteUser(params) {
  
  const { user, setUsers } = params;
  console.log(user)

  const [ open, setOpen ] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    deleteUser(user._id)
      .then(() => {
        console.log("deleteUser");
        getAllUsers().then((response) => {
          console.log("obteniendo todos los usuarios");
          setUsers(response.data);
        });
      })
      .catch((e) => {
        console.log("se produjo un error al eliminar el usuario");
        // TODO: mostrar un toast en caso de error
      });
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Delete">
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
        onClose={ handleClose }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {user.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ handleClose }>Cancel</Button>

          <Button 
            onClick={ handleDelete } 
            autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
