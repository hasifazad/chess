import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, Typography } from '@mui/material';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { UserDetailsContext } from '../context/UserContext';
import api from '../Axios';
export default function PlayWithLink({ ...params }) {
    let { user } = useContext(UserDetailsContext)

    const [gameCode, setGameCode] = useState('')
    const [error, setError] = useState(false)


    const navigate = useNavigate()
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const startGame = () => {
        // let data = {
        //     gameCode: gameCode.split('-')[0],
        //     userId: user.userId
        // }
        // api.put('/game/join-game', data).then((response) => {

        //     if (response.data.status) {
        //         setOpen(false)
        //         if (gameCode.split('-')[1] == 'w')
        //             navigate(`/game/${gameCode.split('-')[0]}-b-${gameCode.split('-')[2]}`)
        //         else
        //             navigate(`/game/${gameCode.split('-')[0]}-w-${gameCode.split('-')[2]}`)
        //     }
        // }).catch((error) => {
        //     setError(true)
        //     console.log(error);
        // })
        navigate(`/game/${gameCode}`)
    }




    // ##############################
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    console.log(error);
    return (
        <>
            <Button onClick={handleClickOpen}>
                PLAY WITH CODE
            </Button>
            <Dialog open={open} >
                {/* <DialogTitle>Subscribe</DialogTitle> */}
                <DialogContent sx={{ paddingBottom: 0 }}>
                    <DialogContentText>
                        Paste your code here
                    </DialogContentText>
                    {error ? <Typography color='red' fontWeight="light" fontSize='12px'>Invalid Link</Typography> : null}
                    <FormControl sx={{ minWidth: 120 }}>
                        <TextField error={error ? true : false} id="outlined-basic" size='small' variant="outlined" value={gameCode}
                            onChange={(e) => { setGameCode(e.target.value); setError(false) }} />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={startGame} disabled={gameCode ? false : true}>start</Button>
                    <Button onClick={handleClose}>cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}