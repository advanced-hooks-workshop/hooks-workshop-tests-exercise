import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { Toggle } from "../src/components/Toggle";

class ToggleDriver {
  render() {
    this.rendered = render(<Toggle />);
  }
  getCheckbox() {
    return this.rendered.findByRole("checkbox");
  }
}
let toggleDriver;
beforeEach(() => (toggleDriver = new ToggleDriver()));

test("should render the checkbox as checked", async () => {
  toggleDriver.render();

  expect(await toggleDriver.getCheckbox()).not.toBeChecked();
});

test("should render the checkbox as checked", async () => {
  toggleDriver.render();
  fireEvent.click(await toggleDriver.getCheckbox());
  expect(await toggleDriver.getCheckbox()).toBeChecked();
});
