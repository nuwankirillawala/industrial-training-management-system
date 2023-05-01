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
            <Button variant="itms" size="itms-small" onClick={handleClickOpen}>
                {btn_name}
            </Button>
            <Dialog open={open} >
                <Stack direction={"row"} justifyContent="space-between" >
                    <DialogTitle width={'27vw'}>{title}</DialogTitle>
                    <DialogActions ><CloseIcon display="flex-end" onClick={handleClose} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</CloseIcon></DialogActions>
                </Stack>
                <DialogContent>
                    <DialogContentText>
                        Dialogbox Content
                    </DialogContentText>
                    {children}

                </DialogContent>

            </Dialog>
        </div >
    );
}