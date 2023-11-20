import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,

};

export default function GameOverMessage({ data }) {
    let navigate = useNavigate()
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    const handleClose = () => navigate('/');

    return (
        <>

            <Modal
                open={true}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >

                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {data}
                    </Typography>
                    <Button onClick={handleClose}>ok</Button>
                </Box>

            </Modal>

        </>
    );
}