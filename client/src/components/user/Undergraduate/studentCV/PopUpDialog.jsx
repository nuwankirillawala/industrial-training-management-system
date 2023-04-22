import React, { Children } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { Tile } from "../../../card/Tile";

// export const PopUpDialog = ({ Children, Open, setEpOpen, id }) => {
export const PopUpDialog = ({ children, open, setOpen, id }) => {
  // console.log(open);
  const handleClose = () => {
    setOpen();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id={id}>{id}</DialogTitle>
      <DialogContent>
        <Tile>{children}</Tile>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>close</Button>
      </DialogActions>
    </Dialog>
  );
};
