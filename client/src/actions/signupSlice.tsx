import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstname: null,
  lastname: null,
  email: null,
  phone_number: null,
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setPage1: (state, action) => {
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.email = action.payload.email;
    },
    setPage2: (state, action) => {
      state.phone_number = action.payload.phone_number;
    },
  
    clearPage1: (state) => {
      state.firstname = null;
      state.lastname = null;
      state.email = null;
    },
    clearPage2: (state) => {
      state.phone_number = null;
    },
  },
});

export const { setPage1, setPage2, clearPage1, clearPage2 } =
  signupSlice.actions;
export default signupSlice.reducer;
