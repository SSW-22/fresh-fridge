import { screen } from "@testing-library/react";
import renderWithProviders from "../../../../utils/test-utils";
import RecipeListItem from "../RecipeListItem";

const item = {
  canonical_id: 1,
  name: "name",
  instructions: "instructions",
  video_url: "video_url",
  sections: "sections",
};

describe("recipe list item", () => {
  it("render with item properies", () => {
    renderWithProviders(<RecipeListItem category="0" item={item} />);

    expect(screen.getByText("name")).toBeInTheDocument();
  });
});
