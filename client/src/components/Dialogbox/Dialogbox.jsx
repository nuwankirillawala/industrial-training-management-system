import * as React from 'react';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';


export default function Dialogbox({ children, title, btn_name }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                {btn_name}
            </Button>
            <Dialog open={open} >
                <Stack direction={"row"} >
                    <DialogTitle width={'27vw'}>{title}</DialogTitle>
                    <DialogActions ><CloseIcon onClick={handleClose} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</CloseIcon></DialogActions>
                </Stack>
                <DialogContent>
                    <DialogContentText>
                        This is content
                    </DialogContentText>
                    {children}

                </DialogContent>

            </Dialog>
        </div >
    );
}