import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  teacher:null,
  token:null
}

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    loginTeacher: (state,action) => {
        state.teacher = action.payload.teacher;
        state.token = action.payload.token
    },
    logoutTeacher:(state)=>{
        state.teacher = null
        state.token = null
    },
    changeTeacherName:(state,action)=>
    {
      state.teacher.firstName = action.payload.firstName
      state.teacher.lastName = action.payload.lastName
    }
},
})

// Action creators are generated for each case reducer function
export const { loginTeacher ,logoutTeacher,changeTeacherName } = teacherSlice.actions

export default teacherSlice.reducer