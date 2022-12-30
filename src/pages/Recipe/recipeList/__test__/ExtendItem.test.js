import { screen } from "@testing-library/react";
import renderWithProviders from "../../../../utils/test-utils";
import ExtendItem from "../ExtendItem";

const item = {
  canonical_id: 1,
  name: "name",
  instructions: [{ display_text: "instructions" }],
  video_url: "video_url",
  sections: [{ components: [{ ingredient: { name: "sections" } }] }],
};

describe("Extend Item Component", () => {
  it("component render", () => {
    renderWithProviders(<ExtendItem item={item} category="0" />);

    expect(screen.getByText("instructions")).toBeInTheDocument();
    expect(screen.getByText("sections,")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save recipe/i }),
    ).toBeInTheDocument();
  });

  it("delete btn render when saved category passed", () => {
    renderWithProviders(<ExtendItem item={item} category="1" />);

    expect(
      screen.getByRole("button", { name: /delete recipe/i }),
    ).toBeInTheDocument();
  });
});
