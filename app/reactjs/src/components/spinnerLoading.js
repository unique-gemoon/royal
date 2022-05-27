import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function SpinnerLoading() {
    return (
        <Stack sx={{
            justifyContent: 'center', 
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(rgba(130, 179, 244, .0) 0%,#80b1f4 90%)",
            padding: "15px 10px"
            }} direction="row">
            <CircularProgress  style={{ 'color': '#1e52a0' }} size={20}  />
        </Stack>
    );
}