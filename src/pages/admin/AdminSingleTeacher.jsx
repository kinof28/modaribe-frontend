import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useParams } from "react-router-dom";
import { useTeacher } from "../../hooks/useTeacher";
import Loading from "../../components/Loading";
import HeaderSingleTeacher from "../../components/client/singleTeacher/HeaderSingleTeacher";
import AboutSingleTeacher from "../../components/client/singleTeacher/AboutSingleTeacher";
import StdeuntsTypeSingleTeacher from "../../components/client/singleTeacher/StdeuntsTypeSingleTeacher";
import AvailablitySingleTeacher from "../../components/client/singleTeacher/AvailablitySingleTeacher";
import PayingTeacher from "../../components/client/singleTeacher/PayingTeacher";
import ResumeSingleTeacher from "../../components/client/singleTeacher/ResumeSingleTeacher";

export default function AdminSingleTeacher() {
  const { teacherId } = useParams();
  const { data, isLoading } = useTeacher(teacherId);
  return (
    <AdminLayout>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <HeaderSingleTeacher teacher={data?.data} />
          <AboutSingleTeacher teacher={data?.data} />
          <StdeuntsTypeSingleTeacher teacher={data?.data} />
          <AvailablitySingleTeacher teacher={data?.data} />
          <PayingTeacher teacher={data?.data} />
          <ResumeSingleTeacher teacher={data?.data} />
        </>
      )}
    </AdminLayout>
  );
}
