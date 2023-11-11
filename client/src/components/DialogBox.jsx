import React, { useState } from 'react'
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { TextField } from '@mui/material';

function DialogBox({ open, handleClick }) {
    // const [state, setState] = useState()

    return (
        <>
            <Dialog open={open}>
                <DialogTitle>
                    Game starts
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Shall we start the game
                    </DialogContentText>
                    <TextField size='small' />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClick}>OK</Button>
                    <Button color='error'>CANCEL</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DialogBox