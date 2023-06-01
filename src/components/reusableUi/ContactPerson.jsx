import { Avatar, Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useTeacher } from '../../hooks/useTeacher'

export default function ContactPerson({item , selectChat,lastMessage,active}) {
    const {data} = useTeacher(item.teacherId);
    return (
            <Box sx={{display:"flex",alignItems:"center",columnGap:"12px",marginBottom:"20px",
            cursor:"pointer" , backgroundColor:active?"#eee":"" , padding:"12px 8px" , borderRadius:"6px"}} onClick={selectChat}>
                <Avatar alt={data?.data?.firstName} src={`${process.env.REACT_APP_API_KEY}images/${data?.data?.image}`} sx={{width:"45px",height:"45px"}}/>
                <Box>
                    <Typography sx={{margin:0}}>{data?.data?.firstName} {data?.data?.lastName}</Typography>
                    <Typography sx={{fontSize:"12px"}}>{lastMessage?.text?.slice(0.30)}</Typography>
                </Box>
            </Box>
    )
}
