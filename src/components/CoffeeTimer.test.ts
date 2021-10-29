import CoffeeTimer from "./CoffeeTimer.vue";
import { render, screen } from "@testing-library/vue";

describe("", () => {
  it("should be ok", () => {
    render(CoffeeTimer, {
      props: {
        msg: "hello",
      },
    });

    expect(screen.getByText());
  });
});
