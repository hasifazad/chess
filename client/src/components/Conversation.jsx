import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField, Typography } from '@mui/material'
import React from 'react'
import { blue } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';

function Conversation({ conv, handleConv }) {

    return (
        <>
            <List sx={{ pt: 0 }}>
                {conv.map((data) => (
                    <ListItem disableGutters key={data._id}>
                        <ListItemButton onClick={() => { handleConv(data._id, data.username) }}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={data.email} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>

    )
}

export default Conversation