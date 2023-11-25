import React, { useState } from "react";
import { useAdminFinancialRecords } from "../../hooks/useAdminFinancialRecords";
import { useTranslation } from "react-i18next";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import Loading from "../Loading";
import { useSelector } from "react-redux";

const FinancialRecords = () => {
  const { t } = useTranslation();
  const columns = [
    { id: "student", label: t("student"), minWidth: 150 },
    { id: "teacher", label: t("teacher"), minWidth: 150 },
    { id: "price", label: t("price"), minWidth: 150 },
    { id: "currency", label: t("currency"), minWidth: 150 },
    { id: "date", label: t("bookingPay"), minWidth: 150 },
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { token } = useSelector((state) => state.admin);

  const { data, isLoading } = useAdminFinancialRecords(token);
  console.log("data: ", data);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          marginTop: "20px",
        }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: "500" }}>
          {t("paymentOperations")}
        </Typography>
      </Box>
      {!isLoading ? (
        <Paper sx={{ width: "100%", padding: "20px" }}>
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
                {data?.data.length > 0 &&
                  data.data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" key={row.id + "demj"}>
                          <TableCell align="center">
                            {row.Student?.name || t("username")}
                          </TableCell>
                          <TableCell align="center">
                            {row.Teacher?.firstName +
                              " " +
                              row.Teacher?.lastName || t("username")}
                          </TableCell>
                          <TableCell align="center">{row?.amount}</TableCell>
                          <TableCell align="center">
                            {row?.currency || ""}
                          </TableCell>
                          <TableCell align="center">
                            {moment(row.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={data?.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default FinancialRecords;
