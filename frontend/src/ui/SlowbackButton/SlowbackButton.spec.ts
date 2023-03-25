import SlowbackButton from "./SlowbackButton.svelte";
import { render, screen } from "@testing-library/svelte";
import type { RenderResult } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

describe("SlowbackButton", () => {
  let renderResult: RenderResult<SlowbackButton>;
  let clickHandler: jest.Mock;
  beforeEach(() => {
    clickHandler = jest.fn();
    renderResult = render(SlowbackButton, {
      props: {
        onClick: clickHandler
      }
    });
  });

  it("should render", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("calls the click handler when clicked", async () => {
    await userEvent.click(screen.getByRole("button"));
    expect(clickHandler).toHaveBeenCalled();
  });
  it("has a contains the primary class when variant is primary", async () => {
    renderResult.rerender({ variant: "primary" });
    expect(screen.getByRole("button")).toHaveClass("slowback-button__primary");
  });
  it("has a contains the outline class when variant is outline", async () => {
    renderResult.rerender({ variant: "outline" });
    expect(screen.getByRole("button")).toHaveClass("slowback-button__outline");
  });
  it("has a contains the text class when variant is text", async () => {
    renderResult.rerender({ variant: "text" });
    expect(screen.getByRole("button")).toHaveClass("slowback-button__text");
  });
});