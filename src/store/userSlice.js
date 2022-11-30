import { createSlice } from "@reduxjs/toolkit";

// const initialToken = sessionStorage.getItem("token");
// const initialId = sessionStorage.getItem("id");

// let initialUserState;

// if (initialToken) {
//   initialUserState = {
//     token: initialToken,
//     uid: initialId,
//     isLogIn: true,
//   };
// } else {
//   initialUserState = {
//     token: "",
//     uid: "",
//     isLogIn: false,
//   };
// }

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
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
