import React from 'react'
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';

function Loading() {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <Typography>Loading...</Typography>
            <CircularProgress />
        </Box>
    )
}

export default Loading;