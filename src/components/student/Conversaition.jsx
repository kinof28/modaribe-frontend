import {
  Paper,
  Box,
  Avatar,
  Typography,
  Divider,
  TextField,
  Button,
  styled,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import Message from "../reusableUi/Message";
import { useForm, Controller } from "react-hook-form";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";

import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { useTeacher } from "../../hooks/useTeacher";
import { useStudent } from "../../hooks/useStudent";

const Form = styled("form")({});

export default function Conversaition({ messages }) {
  const { student } = useSelector((state) => state.student);
  const { teacher } = useSelector((state) => state.teacher);
  const { data } = useTeacher(messages?.teacherId);
  const { data: data2 } = useStudent(messages?.studentId);

  console.log("messages: ", messages);
  console.log("student: ", student);
  console.log("teacher: ", teacher);
  console.log("data about teacher: ", data);
  console.log("data about student: ", data2);

  const ref = useRef();

  const { register, control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      message: "",
    },
  });
  const onSubmit = async (data) => {
    const text = data.message;
    reset({ message: "" });
    if (isOnlyWhitespace(text)) {
      return;
    }
    const time = new Date();
    await updateDoc(doc(db, "chats", messages.id), {
      messages: arrayUnion({
        id: uuid(),
        text: text,
        studentId: student ? `${student.id}` : "",
        teacherId: teacher ? `${teacher.id}` : "",
        date: time,
      }),
      lastmessage: time,
    });
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const isOnlyWhitespace = (str) => {
    return /^\s*$/.test(str);
  };

  return (
    <Paper sx={{ width: "100%", paddingY: "20px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: "12px",
          paddingX: "20px",
        }}
      >
        {!student && !teacher ? (
          <Box sx={{ display: "flex", gap: "3px" }}>
            <Avatar
              alt={`${data?.data?.firstName}`}
              src={`${process.env.REACT_APP_API_KEY}images/${data?.data?.image}`}
              sx={{ width: "45px", height: "45px" }}
            />
            <Avatar
              alt={`${data2?.data?.name}`}
              src={`${process.env.REACT_APP_API_KEY}images/${data2?.data?.image}`}
              sx={{ width: "45px", height: "45px" }}
            />
          </Box>
        ) : (
          <Avatar
            alt={student ? `${data?.data?.firstName}` : `${data2?.data?.name}`}
            src={`${process.env.REACT_APP_API_KEY}images/${
              student ? `${data?.data?.image}` : `${data2?.data?.image}`
            }`}
            sx={{ width: "45px", height: "45px" }}
          />
        )}

        <Typography>
          {student
            ? `${data?.data?.firstName} ${data?.data?.lastName}`
            : teacher
            ? `${data2?.data?.name}`
            : `${data?.data?.firstName} ${data?.data?.lastName} & ${data2?.data?.name} `}
        </Typography>
      </Box>
      <Divider sx={{ marginY: "10px" }} />
      {/* ------------------------------ */}
      <Box sx={{ paddingX: "20px", height: "400px", overflowY: "auto" }}>
        {messages?.messages?.map((msg, index) => {
          const you = student ? msg.studentId !== "" : msg.teacherId !== "";
          const isAdmin = msg.studentId === "" && msg.teacherId === "";
          return (
            <div ref={ref}>
              <Message
                you={you}
                key={index + "pq1"}
                message={msg}
                isAdmin={isAdmin}
              />
            </div>
          );
        })}
      </Box>
      <Form
        sx={{
          marginY: "10px",
          paddingX: "20px",
          display: "flex",
          alignItems: "center",
          columnGap: "8px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField {...field} fullWidth autoComplete="off" />
          )}
          {...register("message", { required: "message Address is required" })}
        />
        {watch("message") && !isOnlyWhitespace(watch("message")) && (
          <Button variant="contained" color="secondary" type="submit">
            Send
          </Button>
        )}
      </Form>
    </Paper>
  );
}
