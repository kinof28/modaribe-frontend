import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

export default function ContactTwoPersons({
  item,
  selectChat,
  lastMessage,
  active,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        flexDirection: "column",
        rowGap: "6px",
        cursor: "pointer",
        backgroundColor: active ? "#eee" : "",
        padding: "12px 8px",
        borderRadius: "6px",
      }}
      onClick={selectChat}
    >
      <Box
        sx={{
          display: "flex",
          columnGap: "12px",
        }}
      >
        {item.studentId === "0" || item.teacherId === "0" ? (
          item.studentId === "0" ? (
            <Avatar
              alt={item.teacherName}
              src={`${process.env.REACT_APP_API_KEY}images/${item.teacherImage}`}
              sx={{ width: "45px", height: "45px" }}
            />
          ) : (
            <Avatar
              alt={item.studentName}
              src={`${process.env.REACT_APP_API_KEY}images/${item.studentImage}`}
              sx={{ width: "45px", height: "45px" }}
            />
          )
        ) : (
          <>
            <Avatar
              alt={item.teacherName}
              src={`${process.env.REACT_APP_API_KEY}images/${item.teacherImage}`}
              sx={{ width: "45px", height: "45px" }}
            />
            <Avatar
              alt={item.studentName}
              src={`${process.env.REACT_APP_API_KEY}images/${item.studentImage}`}
              sx={{ width: "45px", height: "45px" }}
            />
          </>
        )}
        <Box>
          <Typography sx={{ margin: 0 }}>
            {item.studentId === "0" || item.teacherId === "0"
              ? item.teacherName + item.studentName
              : item.teacherName + " & " + item.studentName}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: "12px",
            marginX: "12px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "200px",
          }}
        >
          {lastMessage?.text?.slice(0.3)}
        </Typography>
      </Box>
    </Box>
  );
}
