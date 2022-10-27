import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Tooltip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteUser,getAllUsers } from 'src/services/usersService';

export default function AlertDeleteUser(params) {   

  const {userId} = params
  
  const [ user, setUser ] = React.useState()

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (e) => {
    await   deleteUser(userId)
            
            handleClose()
    
    // llamar al service para q traiga todos los usuarios de nuevo 
    //actualizar el users con el state
    // cerrar el dialog
  }
  
  return (
    <div>
      <Tooltip title="Delete">
              <IconButton
                onClick={() => {
                  handleClickOpen()
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
        <DialogTitle id="alert-dialog-title">
          
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete {}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
          onClick={handleClose}
          >
            Cancel
          </Button>

          <Button 
          onClick={handleDelete} 
          autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}




