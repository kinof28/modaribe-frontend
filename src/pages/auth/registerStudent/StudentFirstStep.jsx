import { Box, Button, Container, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm, Controller } from "react-hook-form";
import Navbar from '../../../components/Navbar';
import HeaderSteps from '../../../components/auth/HeaderSteps';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {useSnackbar} from 'notistack'
import Cookies from 'js-cookie';
import countries from '../../../data/countries';

export default function StudentFirstStep() {
    const { register,control, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            fullName:'',
            email:'',
            place:''
        }
    });

    const {t} = useTranslation()
    const {closeSnackbar,enqueueSnackbar} = useSnackbar()
    const navigate = useNavigate()

    const lang = Cookies.get("i18next") || "en";

    async function onSubmit(data)
    {
        closeSnackbar()
        try{
            const response = await fetch(`${process.env.REACT_APP_API_KEY}api/v1/student/signup`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email:data.email,name:data.fullName,location:data.place})
            })
            const resData = await response.json()
            if(response.status!==200&&response.status!==201)
            {
                enqueueSnackbar(lang==="ar"?resData.message.arabic:resData.message.english,{variant:"error",autoHideDuration:"8000"})
                throw new Error('failed occured')
            }
            localStorage.setItem('studentEmail',data.email)
            navigate('/studentregister/step2')
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return (
        <Navbar>
            <Container sx={{marginTop:"110px"}}>
                <Paper sx={{width:{md:"450px"},padding:"30px 50px",margin:"60px auto 60px"}}>
                    <HeaderSteps step={1} title={t('newAccount')} steps={4}/>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{marginBottom:"30px"}}>
                        <InputLabel sx={{marginBottom:"6px",fontSize:"13px"}}>{t('fullname')}</InputLabel>
                        <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => <TextField type="text" {...field} fullWidth/>}
                        {...register("fullName", { required: "fullName Address is required" })}
                        />
                        {errors.fullName?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>{t('required')}</Typography>}
                    </Box>
                    <Box sx={{marginBottom:"30px"}}>
                        <InputLabel sx={{marginBottom:"6px",fontSize:"13px"}}>{t('email')}</InputLabel>
                        <Controller
                        name="email"
                        control={control}
                        render={({ field }) => <TextField type="text" {...field} fullWidth/>}
                        {...register("email", { required: "email Address is required" })}
                        />
                        {errors.email?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>{t('required')}</Typography>}
                    </Box>
                    <Box sx={{marginBottom:"30px"}}>
                        <InputLabel sx={{marginBottom:"6px",fontSize:"13px"}}>{t('place')}</InputLabel>
                        <Controller
                            name="place"
                            control={control}
                            render={({ field }) => (
                                <Select
                                {...field}
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                MenuProps={{
                                    elevation:1,
                                    PaperProps: {
                                        style: {
                                            maxHeight: 48 * 3 + 8,
                                            width: 160,
                                            },
                                        },
                                }}
                                {...register("place", { required: "place is required" })}
                            >
                                {
                                    countries.map((op,index)=>{
                                        return <MenuItem key={index+"mjnnj"} value={op.code}>{lang==="en"? op.name_en:op.name_ar}</MenuItem>
                                    })
                                }
                            </Select>
                            )}
                        />
                        {errors.place?.type === 'required' && <Typography color="error" role="alert" sx={{fontSize:"13px",marginTop:"6px"}}>{t('required')}</Typography>}
                    </Box>
                    <Button variant='contained' color="secondary" fullWidth type='submit'
                    sx={{textTransform:"capitalize"}}>{t('register')}</Button>
                    </form>
                    <Typography sx={{marginTop:"20px",fontSize:"14px",textAlign:"center"
                    ,fontWeight:"700",marginBottom:"20px"}}>{t('haveanaccount')}</Typography>
                    <Button fullWidth variant="contained" onClick={()=>navigate('/login')}>{t('login')}</Button>
                </Paper>
            </Container>
        </Navbar>
    )
}
