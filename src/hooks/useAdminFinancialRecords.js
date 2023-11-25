import { useQuery } from "react-query";

async function getFinancialRecords(token) {
  const response = await fetch(
    `${process.env.REACT_APP_API_KEY}api/v1/admin/financialRecords`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.json();
}

export const useAdminFinancialRecords = (token) => {
  return useQuery("get-admin-financial-records", () =>
    getFinancialRecords(token)
  );
};
