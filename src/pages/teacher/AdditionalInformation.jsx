import React, { useEffect, useState } from "react";
import TeacherLayout from "../../components/teacher/TeacherLayout";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import StepperButtons from "../../components/reusableUi/StepperButtons";
import CheckBoxLevels from "../../components/teacher/CheckBoxLevels";
import CheckBoxCurriculum from "../../components/teacher/CheckBoxCurriculum";
import Navbar from "../../components/Navbar";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTeacher } from "../../hooks/useTeacher";

export default function AdditionalInformation() {
  const { t } = useTranslation();
  const [checked, setChecked] = React.useState([]);
  const [checked_2, setChecked_2] = React.useState([]);
  const { teacher, token } = useSelector((state) => state.teacher);
  const { data } = useTeacher(teacher.id);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      certificates: "",
      experience: "",
      yearsOfExperience: "",
      gender: "",
      hours_per_week: "",
      bank_name: "",
      acc_name: "",
      acc_number: "",
      iban: "",
      paypal_acc: "",
    },
  });

  useEffect(() => {
    if (data) {
      const user = data?.data;
      setChecked_2(
        user?.CurriculumTeachers.map((c) => {
          return { CurriculumId: c.CurriculumId, TeacherId: c.TeacherId };
        })
      );
      setChecked(
        user?.TeacherLevels.map((l) => {
          return { LevelId: l.LevelId, TeacherId: l.TeacherId };
        })
      );
      reset({
        certificates: user?.haveCertificates ? "yes" : "no",
        experience: user?.haveExperience ? "yes" : "no",
        yearsOfExperience: user?.experienceYears,
        hours_per_week: user?.favHours,
        gender: user?.favStdGender,
        bank_name: user?.bank_name,
        acc_name: user?.acc_name,
        acc_number: user?.acc_number,
        iban: user?.iban,
        paypal_acc: user?.paypal_acc,
      });
    }
  }, [data]);

  const onSubmit = async (data) => {
    if (
      data.bank_name === "" ||
      data.acc_name === "" ||
      data.acc_number === "" ||
      data.iban === "" ||
      data.paypal_acc === ""
    ) {
      console.log(data);

      alert("Please fill all the fields");
      return;
    }
    setLoad(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}api/v1/teacher/additionalInfo/${teacher.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({
            curriculums: checked_2,
            levels: checked,
            haveCertificates: data.certificates == "no" ? false : true,
            haveExperience: data.experience == "no" ? false : true,
            favHours: data.hours_per_week,
            favStdGender: data.gender,
            experienceYears: data.yearsOfExperience,
            bank_name: data.bank_name,
            acc_name: data.acc_name,
            acc_number: data.acc_number,
            iban: data.iban,
            paypal_acc: data.paypal_acc,
          }),
        }
      );
      setLoad(false);
      const resData = await response.json();
      if (resData.status !== 200 && resData.status !== 201) {
        throw new Error("");
      }
      navigate("/teacher/subjects");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Navbar>
      <TeacherLayout title={t("additionalInformation")} active={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ marginBottom: "26px" }}>
            <InputLabel sx={{ marginBottom: "6px", fontSize: "14px" }}>
              {t("certificates")}
            </InputLabel>
            <Controller
              name="certificates"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="yes"
                    control={<Radio size="2px" />}
                    label={t("yes")}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio size="2px" />}
                    label={t("no")}
                  />
                </RadioGroup>
              )}
              {...register("certificates", {
                required: "certificates Address is required",
              })}
            />
            {errors.certificates?.type === "required" && (
              <Typography
                color="error"
                role="alert"
                sx={{ fontSize: "13px", marginTop: "6px" }}
              >
                {t("required")}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginBottom: "26px" }}>
            <InputLabel sx={{ marginBottom: "6px", fontSize: "14px" }}>
              {t("experience")}
            </InputLabel>
            <Controller
              name="experience"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="yes"
                    control={<Radio size="2px" />}
                    label={t("yes")}
                  />
                  <FormControlLabel
                    value="no"
                    control={<Radio size="2px" />}
                    label={t("no")}
                  />
                </RadioGroup>
              )}
              {...register("experience", {
                required: "experience Address is required",
              })}
            />
            {errors.experience?.type === "required" && (
              <Typography
                color="error"
                role="alert"
                sx={{ fontSize: "13px", marginTop: "6px" }}
              >
                {t("required")}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginBottom: "26px" }}>
            <InputLabel sx={{ marginBottom: "6px", fontSize: "14px" }}>
              {t("yearsExp")}
            </InputLabel>
            <Controller
              name="yearsOfExperience"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="0"
                    control={<Radio size="2px" />}
                    label="0"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio size="2px" />}
                    label="1"
                  />
                  <FormControlLabel
                    value="2-4"
                    control={<Radio size="2px" />}
                    label="2-4"
                  />
                  <FormControlLabel
                    value="5-10"
                    control={<Radio size="2px" />}
                    label="5-10"
                  />
                  <FormControlLabel
                    value="+10"
                    control={<Radio size="2px" />}
                    label="+10"
                  />
                </RadioGroup>
              )}
              {...register("yearsOfExperience", {
                required: "yearsOfExperience Address is required",
              })}
            />
            {errors.yearsOfExperience?.type === "required" && (
              <Typography
                color="error"
                role="alert"
                sx={{ fontSize: "13px", marginTop: "6px" }}
              >
                {t("required")}
              </Typography>
            )}
          </Box>
          <Box sx={{ marginBottom: "26px" }}>
            <InputLabel sx={{ marginBottom: "6px", fontSize: "14px" }}>
              {t("genderType")}
            </InputLabel>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="male"
                    control={<Radio size="2px" />}
                    label={t("male")}
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio size="2px" />}
                    label={t("female")}
                  />
                  <FormControlLabel
                    value="both"
                    control={<Radio size="2px" />}
                    label={t("both")}
                  />
                </RadioGroup>
              )}
              {...register("gender", {
                required: "gender Address is required",
              })}
            />
            {errors.yearsOfExperience?.type === "required" && (
              <Typography
                color="error"
                role="alert"
                sx={{ fontSize: "13px", marginTop: "6px" }}
              >
                {t("required")}
              </Typography>
            )}
          </Box>
          <p style={{ marginBottom: "15px" }} htmlFor="">
            {t("bankID")}
          </p>
          <Box sx={{ width: { md: "500px", xs: "100%" } }}>
            <InputLabel sx={{ marginBottom: "6px", fontSize: "13px" }}>
              {t("bank_name")}
            </InputLabel>
            <Controller
              name="bank_name"
              control={control}
              required
              render={({ field }) => (
                <TextField
                  fullWidth
                  required
                  sx={{ marginBottom: 3 }}
                  name="bank_name"
                  {...field}
                />
              )}
              {...register("bank_name", {
                required: "Bank Name is required",
              })}
            />

            {errors.bank_name?.type === "required" && (
              <Typography
                color="error"
                role="alert"
                sx={{ fontSize: "13px", marginTop: "6px" }}
              >
                {t("required")}
              </Typography>
            )}
            <InputLabel sx={{ marginBottom: "6px", fontSize: "13px" }}>
              {t("acc_name")}
            </InputLabel>
            <Controller
              name="acc_name"
              required
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  required
                  sx={{ marginBottom: 3 }}
                  name="acc_name"
                  {...field}
                />
              )}
              {...register("acc_name", {
                required: "Account Name is required",
              })}
            />

            {errors.acc_name?.type === "required" && (
              <Typography
                color="error"
                role="alert"
                sx={{ fontSize: "13px", marginTop: "6px" }}
              >
                {t("required")}
              </Typography>
            )}
            <InputLabel sx={{ marginBottom: "6px", fontSize: "13px" }}>
              {t("acc_number")}
            </InputLabel>
            <Controller
              name="acc_number"
              control={control}
              required
              render={({ field }) => (
                <TextField
                  fullWidth
                  required
                  sx={{ marginBottom: 3 }}
                  name="acc_number"
                  {...field}
                />
              )}
              {...register("acc_number", {
                required: "Account Number is required",
              })}
            />

            {errors.acc_number?.type === "required" && (
              <Typography
                color="error"
                role="alert"
                sx={{ fontSize: "13px", marginTop: "6px" }}
              >
                {t("required")}
              </Typography>
            )}
            <InputLabel sx={{ marginBottom: "6px", fontSize: "13px" }}>
              {t("IBAN")}
            </InputLabel>
            <Controller
              name="iban"
              required
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  required
                  sx={{ marginBottom: 3 }}
                  name="iban"
                  {...field}
                />
              )}
              {...register("iban", {
                required: "IBAN is required",
              })}
            />

            {errors.iban?.type === "required" && (
              <Typography
                color="error"
                role="alert"
                sx={{ fontSize: "13px", marginTop: "6px" }}
              >
                {t("required")}
              </Typography>
            )}
            <InputLabel sx={{ marginBottom: "6px", fontSize: "13px" }}>
              {t("paypal_acc")}
            </InputLabel>
            <Controller
              name="paypal_acc"
              required
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  sx={{ marginBottom: 3 }}
                  type="paypal_acc"
                  {...field}
                />
              )}
              {...register("paypal_acc", {
                required: "PayPal Account is required",
              })}
            />
            {errors.paypal_acc?.type === "required" && (
              <Typography
                color="error"
                role="alert"
                sx={{ fontSize: "13px", marginTop: "6px" }}
              >
                {t("required")}
              </Typography>
            )}
            <p>{t("note_teacher")}</p>
          </Box>
          <Box sx={{ marginBottom: "26px" }}>
            <InputLabel sx={{ marginBottom: "6px", fontSize: "14px" }}>
              {t("hoursPerWeek")}
            </InputLabel>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="1-5"
                    control={<Radio size="2px" />}
                    label="1-5"
                  />
                  <FormControlLabel
                    value="6-10"
                    control={<Radio size="2px" />}
                    label="6-10"
                  />
                  <FormControlLabel
                    value="11-20"
                    control={<Radio size="2px" />}
                    label="11-20"
                  />
                  <FormControlLabel
                    value="21-35"
                    control={<Radio size="2px" />}
                    label="21-35"
                  />
                  <FormControlLabel
                    value="+35"
                    control={<Radio size="2px" />}
                    label="+35"
                  />
                </RadioGroup>
              )}
              {...register("hours_per_week", {
                required: "hours_per_week Address is required",
              })}
            />
            {errors.hours_per_week?.type === "required" && (
              <Typography
                color="error"
                role="alert"
                sx={{ fontSize: "13px", marginTop: "6px" }}
              >
                {t("required")}
              </Typography>
            )}
          </Box>
          <CheckBoxLevels setChecked={setChecked} checked={checked} />
          <CheckBoxCurriculum checked={checked_2} setChecked={setChecked_2} />
          <StepperButtons onSubmit={onSubmit} load={load} skipLink="subjects" />
        </form>
      </TeacherLayout>
    </Navbar>
  );
}
