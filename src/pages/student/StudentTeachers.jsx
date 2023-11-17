import React, { useEffect, useState } from "react";
import StudentLayout from "../../components/student/StudentLayout";
import { Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import { useAllLessons } from "../../hooks/useAllLessons";
import TeacherSearchBox from "../../components/client/searchList/TeacherSearchBox";
import { useMyTeachers } from "../../hooks/useMyTeachers";

function StudentTeachers() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const { student } = useSelector((state) => state.student);
  const teachers = useMyTeachers(student?.id);
  console.log("teachers: ", teachers);
  return (
    <StudentLayout>
      <Paper sx={{ padding: "20px" }}>
        <Typography
          sx={{
            fontSize: "24px",
            marginTop: "12px",
            fontWeight: "600",
            marginBottom: "30px",
          }}
        >
          {t("my_teachers")}
        </Typography>
        {teachers.isLoading ? (
          <Loading />
        ) : (
          <>
            {teachers.data.data.length > 0 &&
              teachers.data.data.map((teacher) => {
                return (
                  <TeacherSearchBox
                    key={teacher.id + ",ekm"}
                    teacher={teacher}
                  />
                );
              })}
            {teachers.data.data.length === 0 && (
              <Paper sx={{ padding: "16px" }}>
                <Typography variant="h6">{t("my_teachers_empty")}</Typography>
              </Paper>
            )}
          </>
        )}
      </Paper>
    </StudentLayout>
  );
}

export default StudentTeachers;
