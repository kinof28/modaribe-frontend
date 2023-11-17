import { useQuery } from "react-query";

async function getTeacherStudents(teacherId) {
  const response = await fetch(
    `${process.env.REACT_APP_API_KEY}api/v1/teacher/students/${teacherId}`
  );
  return response.json();
}

export const useMyTeachers = (teacherId) => {
  return useQuery(["get-teacher-students", teacherId], () =>
    getTeacherStudents(teacherId)
  );
};
