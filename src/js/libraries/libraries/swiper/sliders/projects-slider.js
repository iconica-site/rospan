import Swiper from "swiper";
import { Keyboard, Navigation, Pagination, Scrollbar, } from "swiper/modules";

/** @type {NodeListOf<HTMLDivElement>} */
const projectsSliders = document.querySelectorAll(".projects-slider");

projectsSliders.forEach((projectsSlider) => {
  /** @type {HTMLDivElement} */
  const scrollbar = projectsSlider.querySelector(".slider-controllers__scrollbar");
  /** @type {HTMLDivElement} */
  const pagination = projectsSlider.querySelector(".slider-controllers__pagination");
  /** @type {HTMLDivElement} */
  const prev = projectsSlider.querySelector(".slider-arrow--prev");
  /** @type {HTMLDivElement} */
  const next = projectsSlider.querySelector(".slider-arrow--next");

  const swiper = new Swiper(projectsSlider, {
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
        spaceBetween: 24,
      },
    },
    on: {
      resize: () => {
        swiper.update();
      }
    },
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 12,
    rewind: true,
  });
});
