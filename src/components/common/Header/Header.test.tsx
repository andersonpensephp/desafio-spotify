import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Header } from "./";

describe("Header", () => {
  it("should render the header", () => {
    const { getByText } = render(<Header />);
    const header = getByText("Spotify API");
    expect(header).toBeTruthy();
  });
});