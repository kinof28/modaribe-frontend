import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";
import { useParentStudentFinished } from "../../hooks/useParentStudent";
export default function ParentStudentFinished() {
  const { t } = useTranslation();

  const columns = [
    { id: "name_courseded", label: t("student_name"), minWidth: 150 },
    { id: "name_course_endede", label: t("parent_name"), minWidth: 150 },
    { id: "name_teacherded", label: t("status"), minWidth: 150 },
  ];
  const { token } = useSelector((state) => state.admin);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let { data, isLoading } = useParentStudentFinished(token);

  const [list, setList] = useState([]);

  useEffect(() => {
    if (data) {
      setList(data?.data);
    }
  }, [data]);

  return (
    <Box>
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
                {list
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow hover role="checkbox" key={row.id + "denjhbmj"}>
                        <TableCell align="center">
                          {row?.Student?.name}
                        </TableCell>
                        <TableCell align="center">{row?.Parent.name}</TableCell>
                        <TableCell align="center">
                          {row.status === "1" ? (
                            <Typography color={"green"}>
                              {t("accept")}
                            </Typography>
                          ) : (
                            row.status === "-1" && (
                              <Typography color={"red"}>
                                {t("reject")}
                              </Typography>
                            )
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
            count={data.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Loading />
      )}
    </Box>
  );
}
