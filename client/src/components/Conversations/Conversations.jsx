import React, { useContext } from 'react'


import './Conversations.css'

import axios from 'axios'

import im from '../../images/im.jpg'
import { ChatDetailsContext } from '../../context/ChatContext'
import { UserDetailsContext } from '../../context/UserContext'




function Conversations(props) {
    let blankPic = require('../../images/blankprofilepic.png')
    let a = 'https://chess-user-images.s3.ap-south-1.amazonaws.com'

    const { setChat, setReciever } = useContext(ChatDetailsContext)
    const { user } = useContext(UserDetailsContext)

    const BASE_URL = process.env.REACT_APP_BASE_URL

    const onClickHandle = (data) => {
        setReciever(data)
        axios.get(`${BASE_URL}/api/chat/${user._id}/${data._id}`).then((response) => {
            if (response.data.message === false) {
                setChat([])
            } else {
                console.log('blhaa', response.data[0].chat);
                setChat(response.data[0].chat)
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className='conversation' onClick={() => { onClickHandle(props.data) }}>
            <img className='conversation-img' src={user.image ? `${a}/${props.data._id + props.data.image}` : blankPic} alt='image' />
            <span className='conversation-name'>{props.data.username}</span>
        </div>
    )
}

export default Conversations