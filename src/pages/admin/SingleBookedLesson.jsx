import { Container, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";

function SingleBookedLesson() {
  const { bookedLessonId } = useParams();
  return (
    <AdminLayout>
      <Container
        sx={{ marginBottom: "50px", marginTop: "30px", overflow: "hidden" }}
      >
        <Paper>
          <Typography>Booked Lesson Id: {bookedLessonId} </Typography>
        </Paper>
      </Container>
    </AdminLayout>
  );
}

export default SingleBookedLesson;
