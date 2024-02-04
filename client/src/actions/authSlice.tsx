import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  adminToken: null,
  userToken: null,
  tx_ref: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.adminToken = action.payload.adminToken;
      state.userToken = action.payload.userToken;
    },
    setTxRef: (state, action) => {
      state.tx_ref = action.payload.tx_ref;
    },
    removeTxRef: (state) => {
      state.tx_ref = null;
    },
    setLogout: (state) => {
      state.user = null;
      state.adminToken = null;
      state.userToken = null;
    },
  },
});

export const { setLogin, setLogout, setTxRef, removeTxRef } = authSlice.actions;
export default authSlice.reducer;
