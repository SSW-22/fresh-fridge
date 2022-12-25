import { fireEvent, screen, render } from "@testing-library/react";
import SetNumber from "../SetNumber";

describe("number setting hook test", () => {
  const number = "";
  const setNumber = jest.fn();
  const setIsValid = jest.fn();
  it("input number change test", () => {
    render(
      <SetNumber
        number={number}
        setNumber={setNumber}
        setIsValid={setIsValid}
      />,
    );

    fireEvent.change(screen.getByTestId("number-input-test"), {
      target: { value: 5 },
    });

    expect(setNumber).toHaveBeenCalled();
  });

  it("click increase btn test", () => {
    render(
      <SetNumber
        number={number}
        setNumber={setNumber}
        setIsValid={setIsValid}
      />,
    );

    fireEvent.click(screen.getByTestId("increase-btn"));

    expect(setNumber).toHaveBeenCalled();
  });

  it("click decrease btn test", () => {
    render(
      <SetNumber
        number={number}
        setNumber={setNumber}
        setIsValid={setIsValid}
      />,
    );

    fireEvent.click(screen.getByTestId("decrease-btn"));

    expect(setNumber).toHaveBeenCalled();
  });
});
