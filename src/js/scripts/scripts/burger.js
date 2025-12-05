import { Burger } from "../../modules/burger.js";

const burger = new Burger({
  breakpoint: false,
  a11y: {
    inertElementsSelectors: "[data-wrapper] > *:not([data-burger=\"menu\"])",
    wrapperSelector: "[data-burger=\"menu\"]",
  }
});
