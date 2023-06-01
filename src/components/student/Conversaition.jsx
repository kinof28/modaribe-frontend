import { Paper,Box, Avatar, Typography, Divider, TextField, Button , styled} from '@mui/material'
import React, { useEffect, useRef } from 'react'
import Message from '../reusableUi/Message'
import { useForm, Controller } from "react-hook-form";
import {
    doc,
    updateDoc,
    arrayUnion,
    Timestamp,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

import { db } from '../../firebase'
import { useSelector } from 'react-redux';
import { useTeacher } from '../../hooks/useTeacher';
import { useStudent } from '../../hooks/useStudent';

const Form = styled("form")({})

export default function Conversaition({messages}) {
    const { register,control, handleSubmit  , reset , watch} = useForm({
        defaultValues: {
            message:'',
        }
    });

    const {student} = useSelector((state)=>state.student);
    const {teacher} = useSelector((state)=>state.teacher);

    const {data} = useTeacher(messages?.teacherId);
    const {data:data2} = useStudent(messages?.studentId);

    const ref = useRef();
    


    const onSubmit = async (data) =>{
        const text = data.message;
        reset({message:""})
        if(isOnlyWhitespace(text)){
            return;
        }
        const time = new Date();
        await updateDoc(doc(db, "chats", messages.id), {
            messages: arrayUnion({
              id: uuid(),
              text : text,
              studentId: student? `${student.id}`:"",
              teacherId :teacher ? `${teacher.id}` :"",
              date: time,
            }),
            lastmessage:time
          });
        }

        useEffect(()=>
        {
            ref.current?.scrollIntoView({behavior:"smooth"})
        },[messages])

        const isOnlyWhitespace = (str) => {
            return /^\s*$/.test(str);
          }
    

    return (
        <Paper sx={{width:"100%",paddingY:"20px"}}>
            <Box sx={{display:"flex",alignItems:"center",columnGap:"12px",paddingX:"20px"}}>
                <Avatar alt={student ? `${data?.data?.firstName}` : `${data2?.data?.name}`}
                src={`${process.env.REACT_APP_API_KEY}images/`} sx={{width:"45px",height:"45px"}}/>
                <Typography>{student ? `${data?.data?.firstName} ${data?.data?.lastName}` : `${data2?.data?.name}`}</Typography>
            </Box>
            <Divider sx={{marginY:"10px"}}/>
            <Box sx={{paddingX:"20px" , height:"400px" , overflowY:"auto"}}>
                {
                    messages?.messages?.map((msg,index)=>
                    {
                        const you= student ? msg.studentId!=="":  msg.teacherId!==""
                        return <div ref={ref}>
                            <Message you={you} key={index+'pq1'} message={msg}/>
                        </div>
                    })
                }
            </Box>
            <Form sx={{marginY:"10px",paddingX:"20px",display:"flex",alignItems:"center",columnGap:"8px"}} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => <TextField {...field} fullWidth autoComplete='off'/>}
                    {...register("message", { required: "message Address is required" })}
                    />
                    {watch('message')&&!isOnlyWhitespace(watch('message'))&&<Button variant="contained" color="secondary" type='submit'>Send</Button>}
            </Form>
        </Paper>
    )
}
