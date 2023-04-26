import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState } from 'react'

// uncompleted
const DialogBox = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogData, setDialogData] = useState();

    return (
        <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"List Saved!"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    List Saved Successfully. <br />
                    Company Name:
                    Saved candidates:
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Back to Company Page</Button>
                <Button onClick={() => setDialogOpen(false)} autoFocus type="close">Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogBox