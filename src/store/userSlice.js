import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  token: "",
  uid: "",
  isLogIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    logIn(state, action) {
      let loginAuth = state;
      loginAuth = {
        token: action.payload.token,
        uid: action.payload.uid,
        isLogIn: true,
      };
      return loginAuth;
    },
    logOut(state) {
      let logoutAuth = state;
      logoutAuth = {
        token: "",
        uid: "",
        isLogIn: false,
      };
      return logoutAuth;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
