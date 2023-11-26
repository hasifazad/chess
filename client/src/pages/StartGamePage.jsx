import React, { useState } from 'react'
import ChessBoardOffline from '../components/ChessBoardOffline'
import { Box } from '@mui/material'
import FloatingButton from '../components/FloatingButton'
import FloatChat from '../components/FloatChat'

function StartGamePage() {

    const [state, setState] = useState(false)

    const onHandleChange = () => {
        setState(!state)
    }

    return (
        <>
            <Box>
                {state ? <FloatChat /> : null}
                <ChessBoardOffline />
                <FloatingButton fun={onHandleChange} state={state} />
            </Box>
        </>
    )
}

export default StartGamePage