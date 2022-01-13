import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AlertDialog = (props) => {
  const { button, dialogButton, title, desc, clickHandler } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {button}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle name="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText name="alert-dialog-description">
            {desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clickHandler} >{dialogButton}</Button>
          <Button onClick={handleClose} variant="contained" color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertDialog;
