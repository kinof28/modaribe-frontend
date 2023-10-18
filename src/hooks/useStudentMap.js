import { useQuery } from "react-query";

async function getMap(id, token) {
  const response = await fetch(
    `https://server.moalime.com/api/v1/student/nearestTeachers/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );
  return response.json();
}

export const useStudentMap = (id, token) => {
  return useQuery(["get-map", id], () => getMap(id, token));
};
