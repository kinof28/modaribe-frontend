import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { Container, Typography } from "@mui/material";

function AdminHistory() {
  return (
    <AdminLayout>
      <Container
        sx={{ marginBottom: "50px", marginTop: "30px", overflow: "hidden" }}
      >
        <Typography>History goes here </Typography>
      </Container>
    </AdminLayout>
  );
}

export default AdminHistory;
