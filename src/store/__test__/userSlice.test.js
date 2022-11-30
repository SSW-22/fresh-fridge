import userSlice, { userActions } from "../userSlice";

describe("redux", () => {
  it("logIn", () => {
    const initialState = { token: "", uid: "" };
    const state = userSlice(
      initialState,
      userActions.logIn({ token: "token", uid: "uid" }),
    );

    expect(state.uid).not.toHaveLength(0);
  });
});
