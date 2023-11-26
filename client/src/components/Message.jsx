import { Typography } from '@mui/material'
import React, { useContext } from 'react'
import { UserDetailsContext } from '../context/UserContext'
import "../styles/message.css"

function Message({ msg }) {

    let { user } = useContext(UserDetailsContext)

    return (
        <>
            <div className={msg?.sender == user.userId ? 'message-right' : 'message-left'}>

                <div className={msg?.sender == user.userId ? 'message-body-right' : 'message-body-left'}>
                    <Typography sx={{ wordWrap: 'break-word', textAlign: 'start' }} >{msg?.message}</Typography>
                </div>
            </div>

        </>
    )
}

export default Message