import reducer, { userActions } from "../userSlice";

describe("redux", () => {
  test("initial", () => {
    expect(reducer(undefined, { type: undefined })).toEqual({
      token: "",
      uid: "",
      isLogIn: false,
    });
  });

  test("Log in", () => {
    const previousState = {};
    expect(
      reducer(previousState, userActions.logIn({ token: "token", uid: "uid" })),
    ).toEqual({
      token: "token",
      uid: "uid",
      isLogIn: true,
    });
  });

  test("Log out", () => {
    const previousState = { token: "token", uid: "uid" };
    expect(reducer(previousState, userActions.logOut())).toEqual({
      token: "",
      uid: "",
      isLogIn: false,
    });
  });
});
