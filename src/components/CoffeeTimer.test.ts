import CoffeeTimer from "./CoffeeTimer.vue";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/vue";

describe("Timer Component", () => {
  it("should have a button to start the timer", () => {
    render(CoffeeTimer);

    expect(screen.getByRole("button", { name: "Start Timer" }));
  });

  it("clicking on start should start the timer", async () => {
    render(CoffeeTimer);

    userEvent.click(screen.getByRole("button", { name: "Start Timer" }));

    await expect(screen.findByText("Started")).resolves.toBeVisible();
    await expect(
      screen.queryByRole("button", { name: "Start Timer" })
    ).not.toBeInTheDocument();
  });

  it("should have a button to stop the timer", async () => {
    render(CoffeeTimer);

    userEvent.click(screen.getByRole("button", { name: "Start Timer" }));

    await expect(
      screen.findByRole("button", { name: "Stop" })
    ).resolves.toBeVisible();
    userEvent.click(screen.getByRole("button", { name: "Stop" }));

    await expect(
      screen.findByRole("button", { name: "Start Timer" })
    ).resolves.toBeVisible();
  });
});
