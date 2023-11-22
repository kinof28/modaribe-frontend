import React from "react";
import { useTranslation } from "react-i18next";
import AdminLayout from "../../components/admin/AdminLayout";
import TeacherLayout from "../../components/teacher/TeacherLayout";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
const AdminEditTeacherAvailability = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { teacherId } = useParams();

  return (
    <AdminLayout>
      <TeacherLayout active={5} title={t("availability")}>
        <Button
          sx={{ textTransform: "capitalize", marginTop: "40px" }}
          variant="outlined"
          onClick={() =>
            navigate("/admin/edit/teacher/description/" + teacherId)
          }
        >
          {t("skip")}
        </Button>
      </TeacherLayout>
    </AdminLayout>
  );
};

export default AdminEditTeacherAvailability;
