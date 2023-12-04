import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField, Typography } from '@mui/material'
import React from 'react'
import { blue } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import Loading from './Loading';

function Conversation({ conv, handleConv }) {
    console.log(conv);
    return (
        <>
            {conv.length == 0 ? <Loading /> :
                <List sx={{ pt: 0 }}>
                    {/* {console.log(data?.image)} */}
                    {conv.map((data) => (
                        <ListItem disableGutters key={data._id}>
                            <ListItemButton onClick={() => { handleConv(data._id, data.username, data.image) }}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }} src={data.image}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={data.username} secondary={data.email} />
                            </ListItemButton>
                        </ListItem>
                    ))}


                </List>
            }
        </>

    )
}

export default Conversation