import React from 'react'
import Navbar from '../../components/Navbar'
import { Container,Paper, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import {useAllLessons} from '../../hooks/useAllLessons'
import BookedLesson from '../../components/student/BookedLesson'
import Loading from '../../components/Loading'
import { useTranslation } from 'react-i18next';

export default function ParentStudent() {
    const {id} = useParams()
    const {data,isLoading} = useAllLessons(id)
    const {t} = useTranslation() 

    return (
        <Navbar>
            <Container sx={{marginTop:"120px"}}>
            {
                !isLoading?
                <Paper sx={{marginY:"80px",padding:"40px 20px 20px"}}>
                    <Typography sx={{marginBottom:"30px",fontSize:"24px",fontWeight:"600"}}>{t('registeredlessons')}</Typography>
                {
                    data?.data?.length>0&&data.data.map((lesson,index)=>
                    {
                        return(
                            <BookedLesson
                            image={lesson?.Teacher?.image}
                            name={lesson?.Teacher.firstName+" "+lesson?.Teacher.lastName}
                            date={lesson?.date}
                            type={lesson?.type}
                            period={lesson?.period}
                            key={index+'zw3'}/>
                        )
                    })
                }
                </Paper>
                :
                <Loading/>
            }
            </Container>
        </Navbar>
    )
}
