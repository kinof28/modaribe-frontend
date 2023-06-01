import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Cookies from 'js-cookie'
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';

const Image = styled("img")({
    width:"80%",
    height:"160px",
    borderRadius:"8px"
})


export default function SubjectBox({subject,setOpen}) {
    const {t} = useTranslation();

  return (
    <Box sx={{backgroundColor:"#59aefc1a",borderRadius:"6px",padding:"16px 10px",textAlign:"center"}}>
        <Image src={`${process.env.REACT_APP_API_KEY}images/${subject.image}`}/>
        <Typography sx={{fontSize:"20px",fontWeight:"600",marginBottom:"8px"}}>
            {Cookies.get("i18next")==='ar'?subject.titleAR:subject.titleEN}
        </Typography>
        <Typography sx={{fontSize:"13px"}}>{subject?.Subjects?.length} {t('categories')}</Typography>
        <Button variant="contained" size='small' sx={{marginTop:"20px"}}
        onClick={()=>setOpen(subject.id)}>
            {t('update')}
        </Button>
    </Box>
  )
}
