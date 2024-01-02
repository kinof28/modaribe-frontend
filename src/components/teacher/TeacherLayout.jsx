import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import TeacherStepper from "./TeacherStepper";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useTeacher } from "../../hooks/useTeacher";

export default function TeacherLayout({ active, title, children }) {
  const { t } = useTranslation();
  const { teacher } = useSelector((state) => state.teacher);
  const { data, isLoading } = useTeacher(teacher?.id);
  return (
    <Container sx={{ marginBottom: "60px", marginTop: "120px" }}>
      {!isLoading &&
      (!data.data.firstName ||
        !data.data.lastName ||
        !data.data.gender ||
        !data.data.dateOfBirth ||
        !data.data.phone ||
        !data.data.email ||
        !data.data.country ||
        !data.data.city ||
        !data.data.image ||
        !data.data.favStdGender ||
        !data.data.experienceYears ||
        !data.data.favHours ||
        !data.data.shortHeadlineAr ||
        !data.data.shortHeadlineEn ||
        !data.data.descriptionAr ||
        !data.data.descriptionEn ||
        data.data.CurriculumTeachers.length === 0 ||
        data.data.TeacherLevels.length === 0) ? (
        <Typography
          sx={{
            bgcolor: "#f50000",
            padding: "10px 20px",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "10px",
          }}
          variant="h5"
        >
          {t("complete_teacher_account")}
        </Typography>
      ) : (
        !data.data.isVerified && (
          <Typography
            sx={{
              bgcolor: "orange",
              padding: "10px 20px",
              color: "#fff",
              fontWeight: "600",
              borderRadius: "10px",
            }}
            variant="h5"
          >
            {t("account_under_review")}
          </Typography>
        )
      )}

      <TeacherStepper active={active} />
      <Paper sx={{ marginY: "50px", paddingY: "40px", paddingX: "30px" }}>
        <Typography
          sx={{ fontSize: "24px", fontWeight: "600", marginBottom: "30px" }}
        >
          {title}
        </Typography>
        {children}
      </Paper>
    </Container>
  );
}
