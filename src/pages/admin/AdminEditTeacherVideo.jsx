import React from "react";
import { useTranslation } from "react-i18next";
import AdminLayout from "../../components/admin/AdminLayout";
import TeacherLayout from "../../components/teacher/TeacherLayout";

const AdminEditTeacherVideo = () => {
  const { t } = useTranslation();

  return (
    <AdminLayout>
      <TeacherLayout active={7} title={t("Videointroduction")}></TeacherLayout>
    </AdminLayout>
  );
};

export default AdminEditTeacherVideo;
