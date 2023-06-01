import React from 'react'
import Navbar from '../../components/Navbar'
import { Container, Grid, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next';
import {useCreditTeacher} from '../../hooks/useCreditTeacher'
import { useSelector } from 'react-redux';
import { useTeacherHistroy } from '../../hooks/useTeacherHistroy';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function TeacherCredit() {
    const {t} = useTranslation()
    const {teacher,token} = useSelector((state)=>state.teacher)
    const {data,isLoading} = useCreditTeacher(teacher?.id,token)

    const finicails = useTeacherHistroy(teacher?.id,token)
    
    return (
        <Navbar>
            <Container sx={{marginY:"120px"}}>
                <Paper sx={{padding:"40px 20px"}}>
                    <Grid container rowGap={2} spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={4}>
                            <Typography sx={{fontSize:"18px",textAlign:"center"}}>{t('totalbalance')}</Typography>
                            <Typography sx={{fontSize:"24px",textAlign:"center"}}>{isLoading?0:data.data.totalAmount} omr</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography sx={{fontSize:"18px",textAlign:"center"}}>{t('availablebalance')}</Typography>
                            <Typography sx={{fontSize:"24px",textAlign:"center"}}>{isLoading?0:data.data.totalAmount - data.data.dues} omr</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography sx={{fontSize:"18px",textAlign:"center"}}>{t('withdrawnbalance')}</Typography>
                            <Typography sx={{fontSize:"24px",textAlign:"center"}}>{isLoading?0:data.data.dues} omr</Typography>
                        </Grid>
                    </Grid>
                </Paper>
                {
                    !finicails.isLoading?
                    <TableContainer component={Paper} sx={{marginTop:"30px"}}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="right">{t('amount')}</TableCell>
                                <TableCell align="right">{t('status')}</TableCell>
                                <TableCell align="right">{t('history')}</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {finicails.data?.data.map((row) => (
                                <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="right">{row.amount}</TableCell>
                                <TableCell align="right">{t(row.type)}</TableCell>
                                <TableCell align="right">{row.createdAt.split('T')[0]}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    :
                    ""
                }
            </Container>
        </Navbar>
    )
}
