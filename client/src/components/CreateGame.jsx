import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, FormControlLabel, InputAdornment, RadioGroup, Slider, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import PlayWithLink from './PlayWithLink';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDetailsContext } from '../context/UserContext';
import api from '../Axios';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function CreateGame() {

    const { user } = useContext(UserDetailsContext)

    const [chessPieceColor, setChessPieceColor] = useState('w');
    const [timeDuration, setTimeDuration] = useState(10);
    const [codeGenerated, setCodeGenerated] = useState('')

    const handleColorSelect = (event, newColor) => {
        setChessPieceColor(newColor);
    };
    const valueText = (value) => {
        setTimeDuration(value)
    }

    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const createLink = () => {
        let data = {
            userId: user.userId,
            chessPieceColor,
            timeDuration,
        }
        // axios.post(`${BASE_URL}/api/game/create-game`, data).then((response) => {
        //     console.log(response);
        // }).catch((error) => {
        //     console.log(error);
        // })
        api.post('/game/create-game', data).then((response) => {
            console.log(response);
            setCodeGenerated(`${response.data.gameId}-${chessPieceColor}-${timeDuration}`)

        }).catch((error) => {
            console.log(error);
        })
    }

    const navigate = useNavigate()
    const handlePlay = () => {
        navigate(`/game/${codeGenerated}`)
    }

    const [copy, setCopy] = useState('copy')
    const copyText = () => {
        navigator.clipboard.writeText(codeGenerated).then(() => {
            setCopy('copied');
            setTimeout(function () {
                setCopy('copy');
            }, 3000);
        }).catch((err) => console.log(err))
    }


    // ###########################################
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };



    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={handleClickOpen}>
                CREATE GAME
            </Button>
            <Dialog open={open}>
                <DialogTitle>Create a Game</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Choose you chess piece color, time duration and press the below button to create a shareable code.
                    </DialogContentText>
                    {!codeGenerated ? <><Box>
                        <ToggleButtonGroup
                            color='success'
                            value={chessPieceColor}
                            exclusive
                            onChange={handleColorSelect}
                            fullWidth
                            sx={{ margin: '20px 0' }}
                        >
                            <ToggleButton value="w">
                                <Typography>WHITE</Typography>
                            </ToggleButton>
                            <ToggleButton value="r">
                                <Typography>RANDOM</Typography>
                            </ToggleButton>
                            <ToggleButton value="b">
                                <Typography>BLACK</Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                        <Box sx={{ margin: '20px 0' }}>
                            <Typography>Time Duration &nbsp;&nbsp;:&nbsp;{timeDuration} minutes</Typography>
                            <Slider defaultValue={timeDuration} getAriaValueText={valueText} aria-label="Default" valueLabelDisplay="auto" />
                        </Box></> : null}
                    <Button variant="contained" disabled={codeGenerated ? true : false} onClick={createLink} fullWidth>CREATE CODE</Button>

                    <TextField size="small" fullWidth disabled sx={{ margin: '20px 0 15px 0' }} value={codeGenerated}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" style={{ cursor: 'pointer' }} onClick={copyText}>
                                    <Tooltip title={copy}>
                                        <ContentCopyIcon />
                                    </Tooltip>
                                </InputAdornment>
                            )
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    {/* <PlayWithLink /> */}
                    <Button onClick={handlePlay} disabled={codeGenerated ? false : true}>PLAY</Button>
                    <Button onClick={handleClose}>CANCEL</Button>
                </DialogActions>
            </Dialog >
        </>
    );
}
