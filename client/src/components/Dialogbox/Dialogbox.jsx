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
    const btn_variant = () => {
        if (btn_name === 'update') {
            return 'itms-update';
        } else if (btn_name === 'delete') {
            return 'itms-delete';
        } else {
            return 'itms';
        }
    }

    return (
        <div>
            <Button
                variant='itms'
                size="itms-x-small"
                onClick={handleClickOpen}
            >
                {btn_name}
            </Button>


            <Dialog open={open} >
                <Stack direction={"row"} justifyContent="space-between" >
                    <DialogTitle width={'27vw'}>{title}</DialogTitle>
                    <DialogActions ><CloseIcon display="flex-end" onClick={handleClose} style={{ backgroundColor: 'red', color: 'white' }}>Cancel</CloseIcon></DialogActions>
                </Stack>
                <DialogContent>
                    <DialogContentText>
                        {/* if u want you can add instructions here without Typography */}
                    </DialogContentText>
                    {children}

                </DialogContent>

            </Dialog>
        </div >
    );
}