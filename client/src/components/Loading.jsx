import React from 'react'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

function Loading() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} height='80vh'>
            <Typography>Loading...</Typography>
            <CircularProgress />
        </Box>
    )
}

export default Loading;