import React, { useState } from 'react'
import ChessBoard from '../components/ChessBoard'

import { Box, Button } from '@mui/material'
import FloatChat from '../components/FloatChat'
import FloatingButton from '../components/FloatingButton'

function GamePage() {

    const [state, setState] = useState(false)


    const onHandleChange = () => {
        setState(!state)
    }


    return (
        <>

            <Box>
                {state ? <FloatChat /> : null}
                <ChessBoard />
                <FloatingButton fun={onHandleChange} state={state} />
            </Box>
        </>
    )
}

export default GamePage