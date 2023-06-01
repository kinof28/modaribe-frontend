import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { format } from 'timeago.js';


export default function Message({you,message}) {
    return (
        <Box sx={{marginBottom:"16px",display:"flex",flexDirection:"column",alignItems:you?"end":"start"}}>
            <Typography sx={{fontSize:"15px",backgroundColor:you?"#3268ab":"#f5f8f9",width:"fit-content",color:you?"white":"#3268ab",padding:"6px 10px",
            borderRadius:"25px"}}>
                {message.text}
            </Typography>
            <Stack direction={"row"} alignItems="center">
                 <Typography sx={{fontSize:"11px",marginY:"5px"}}>{format(message.date)}</Typography>
            </Stack>
        </Box>
    )
}
