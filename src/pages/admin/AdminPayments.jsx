import React, { useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Loading from '../../components/Loading'
import {useAdminDeposits} from '../../hooks/useAdminDeposits'
import { useSelector } from 'react-redux';
import Moment from 'moment'

export default function AdminPayments() {
    const {t} = useTranslation()

    const columns = [
        { id: 'Name', label: t('student'), minWidth: 150 },
        { id: 'Gender', label: t('price'), minWidth: 150 },
        { id: 'Phone', label: t('currency'), minWidth: 150 },
        { id: 'View', label: t('bookingPay'), minWidth: 150 },];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const {token} = useSelector((state)=>state.admin)
    const {data,isLoading} = useAdminDeposits(token)
    const [pdf, setPdf] = useState(null);

    async function handleDownloadFile()
    {
        try{
            const response = await fetch(`${process.env.REACT_APP_API_KEY}api/v1/admin/wallets/pdf`,{
                headers:{
                    "Authorization":token
                }
            })
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'document.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
        }
        catch(err)
        {
            console.log(err)
        }
    }

    return (
    <AdminLayout>
        <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"30px",
        marginTop:"20px"}}>
            <Typography sx={{fontSize:"20px",fontWeight:"500"}}>{t('Balancechargeoperations')}</Typography>
            <Button variant="contained" onClick={handleDownloadFile}>{t('download')}</Button>
        </Box>
        {pdf && <embed src={URL.createObjectURL(pdf)} type="application/pdf" width="100%" height="600px" />}
        {
        !isLoading?
        <Paper sx={{ width: '100%',padding:"20px"}}>
                <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={"center"}
                            style={{ top: 57, minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    <TableBody>
                        {data?.data.length>0&&data.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return <TableRow hover role="checkbox"  key={row.id+"demj"}>
                                <TableCell align='center'>
                                    {row.Student?.name || t('username')}
                                </TableCell>
                                <TableCell align='center'>
                                    {row?.price}
                                </TableCell>
                                <TableCell align='center'>
                                    {row?.currency || ''}
                                </TableCell>
                                <TableCell align='center'>
                                    {Moment(row.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={[].length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
        </Paper>
        :
        <Loading/>
        }
    </AdminLayout>
)
}