import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { Container, styled, Box, Typography, Paper } from "@mui/material";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { collection, query, onSnapshot, where, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { format } from "timeago.js";

const Wrapper = styled(Box)({
  display: "flex",
  columnGap: "10px",
  justifyContent: "center",
});

const IconWrapper = styled(Box)({
  width: "55px",
  height: "55px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export default function TeacherNotifications() {
  const { teacher, token } = useSelector((s) => s.teacher);
  const lang = Cookies.get("i18next") || "en";
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "Notifications"),
      where("TeacherId", "==", `${teacher.id}`)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let conv = [];
      querySnapshot.forEach((doc) => {
        conv.push({ ...doc.data(), id: doc.id });
      });
      setNotifications(conv);
    });
    return () => unsubscribe();
  }, [teacher]);

  useEffect(() => {
    async function updateNotification() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_KEY}api/v1/teacher/updateNotification/${teacher.id}`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            method: "PUT",
          }
        );
        const resData = await response.json();
        if (response.status !== 200 && response.status !== 201) {
          throw new Error("failed occured");
        }
      } catch (err) {
        console.log(err);
      }
    }
    setTimeout(() => {
      updateNotification();
    }, 5000);
  }, [teacher, token]);

  return (
    <Navbar>
      <Container
        sx={{
          marginBottom: "60px",
          marginTop: "120px",
          padding: "40px 20px 20px",
        }}
        component={Paper}
      >
        {notifications.length > 0 &&
          notifications.map((not) => {
            return (
              <Wrapper sx={{ marginBottom: "35px" }} key={not.id}>
                <IconWrapper
                  sx={{
                    backgroundColor: !not.seen ? "#e66b4c47" : "#40c0dc33",
                  }}
                >
                  <NotificationsActiveOutlinedIcon
                    sx={{
                      color: "black",
                      fontSize: "26px",
                      transform: "rotate(45deg)",
                    }}
                  />
                </IconWrapper>
                <Box sx={{ width: "90%" }}>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: "#303030",
                      fontWeight: "400",
                      marginBottom: "8px",
                    }}
                  >
                    {lang === "en" ? not.titleEn : not.titleAR}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      color: "#949494",
                      fontWeight: "500",
                    }}
                  >
                    {typeof not?.date !== "undefined" && format(not?.date)}
                  </Typography>
                </Box>
              </Wrapper>
            );
          })}
      </Container>
    </Navbar>
  );
}
