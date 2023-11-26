import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


export default function FloatingButton({ fun, state }) {

    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        zIndex: '99'
    };

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }} style={style}>


            <Fab color="primary" aria-label="add" onClick={fun} >
                {state ? <CloseRoundedIcon /> : <ChatBubbleRoundedIcon />}
            </Fab>
            {/* <Fab color="secondary" aria-label="edit">
                <EditIcon />
            </Fab>
            <Fab variant="extended">
                <NavigationIcon sx={{ mr: 1 }} />
                Navigate
            </Fab>
            <Fab disabled aria-label="like">
                <FavoriteIcon />
            </Fab> */}

        </Box>
    );
}
