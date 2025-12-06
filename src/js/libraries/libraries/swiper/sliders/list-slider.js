import Swiper from "swiper";
import { Keyboard, Navigation, Pagination, Scrollbar, } from "swiper/modules";

/** @type {NodeListOf<HTMLDivElement>} */
const listSliders = document.querySelectorAll(".list-slider");

listSliders.forEach((listSlider) => {
  /** @type {HTMLDivElement} */
  const scrollbar = listSlider.querySelector(".slider-controllers__scrollbar");
  /** @type {HTMLDivElement} */
  const pagination = listSlider.querySelector(".slider-controllers__pagination");
  /** @type {HTMLDivElement} */
  const prev = listSlider.querySelector(".slider-arrow--prev");
  /** @type {HTMLDivElement} */
  const next = listSlider.querySelector(".slider-arrow--next");

  const swiper = new Swiper(listSlider, {
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
      "1300.1": {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    },
    slidesPerView: "auto",
    spaceBetween: 11,
    rewind: true,
  });
});
