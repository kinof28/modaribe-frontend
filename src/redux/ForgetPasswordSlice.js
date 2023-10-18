import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";

export const sendEmail = createAsyncThunk(
  "forgetPassword",
  async (email, token, { dispatch }) => {
    console.log(email, token);
    try {
      await axios.post("api/v1/forgetPassword", email, {
        headers: {
          Authorization: token,
        },
      });
      dispatch(setEmail(email));
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  email: "",
};

export const ForgetPasswordSlice = createSlice({
  name: "ForgetPassword",
  initialState,
  reducers: {
    setEmail: (action, state) => {
      state.email = action.email;
    },
  },
});

export const { setEmail } = ForgetPasswordSlice.actions;

export default ForgetPasswordSlice.reducer;
