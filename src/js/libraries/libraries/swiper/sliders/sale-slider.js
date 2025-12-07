import Swiper from "swiper";
import { Keyboard, Navigation, Pagination, Scrollbar, } from "swiper/modules";

/** @type {NodeListOf<HTMLDivElement>} */
const saleSliders = document.querySelectorAll(".sale-slider");

saleSliders.forEach((saleSlider) => {
  /** @type {HTMLDivElement} */
  const scrollbar = saleSlider.querySelector(".slider-controllers__scrollbar");
  /** @type {HTMLDivElement} */
  const pagination = saleSlider.querySelector(".slider-controllers__pagination");
  /** @type {HTMLDivElement} */
  const prev = saleSlider.querySelector(".slider-arrow--prev");
  /** @type {HTMLDivElement} */
  const next = saleSlider.querySelector(".slider-arrow--next");

  const swiper = new Swiper(saleSlider, {
    modules: [Keyboard, Navigation, Pagination, Scrollbar,],
    keyboard: {
      enabled: true,
      pageUpDown: false,
    },
    navigation: {
      enabled: true,
      nextEl: next,
      prevEl: prev,
    },
    pagination: {
      el: pagination,
      enabled: true,
      type: "fraction",
      formatFractionCurrent(number) {
        return number.toString().padStart(2, "0");
      },
      formatFractionTotal(number) {
        return number.toString().padStart(2, "0");
      },
      renderFraction(currentClass, totalClass) {
        return `<span class="${currentClass}"></span> <sup><span class="swiper-pagination-divider">|</span> <span class="${totalClass}"></span></sup>`;
      },
    },
    scrollbar: {
      draggable: true,
      el: scrollbar,
      enabled: true,
    },
    breakpoints: {
      "600.1": {
        slidesPerView: "auto",
        spaceBetween: 21,
      },
      "1300.1": {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
    slidesPerView: "auto",
    spaceBetween: 10,
    rewind: true,
  });
});
