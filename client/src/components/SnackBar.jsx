import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

function SnackBar({ open }) {
    const [state, setState] = React.useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal } = state;

    return (
        <Box sx={{ width: 500 }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={true}
                // onClose={}
                ContentProps={{
                    sx: {
                        backgroundColor: "green",
                    }
                }}
                message="Profile updated successfully"
                key={vertical + horizontal}
            />
        </Box>
    )
}

export default SnackBar