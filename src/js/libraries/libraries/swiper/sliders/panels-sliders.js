import Swiper from "swiper";
import { Autoplay, Keyboard, Scrollbar, Thumbs, } from "swiper/modules";

/** @type {HTMLDivElement} */
const panelsTabs = document.querySelector(".panels-tabs");
/** @type {HTMLDivElement} */
const panelsMain = document.querySelector(".panels-main");

if (panelsTabs && panelsMain) {
  const tabs = new Swiper(panelsTabs, {
    breakpoints: {
      "600.1": {
        spaceBetween: 29,
      },
      "992.1": {
        spaceBetween: 25,
      },
    },
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    rewind: true,
  });

  const main = new Swiper(panelsMain, {
    modules: [Keyboard, Thumbs],
    keyboard: {
      enabled: true,
      pageUpDown: false,
    },
    thumbs: {
      swiper: tabs,
    },
    spaceBetween: 48,
    autoHeight: true,
    rewind: true,
  });
}

/** @type {NodeListOf<HTMLDivElement>} */
const panelsContents = document.querySelectorAll(".panels-content");

panelsContents.forEach(panelsContent => {
  /** @type {HTMLDivElement} */
  const panelsThumbs = panelsContent.querySelector(".panels-thumbs");
  /** @type {HTMLDivElement} */
  const panelsSlider = panelsContent.querySelector(".panels-slider");

  if (panelsThumbs && panelsSlider) {
    const scrollbar = panelsContent.querySelector(".panels-content__scrollbar");

    const thumbs = new Swiper(panelsThumbs, {
      slidesPerView: "auto",
      spaceBetween: 12,
      nested: true,
    });

    const slider = new Swiper(panelsSlider, {
      modules: [Autoplay, Scrollbar, Thumbs],
      autoplay: {
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      scrollbar: {
        draggable: true,
        el: scrollbar,
        enabled: true,
      },
      thumbs: {
        swiper: thumbs,
      },
      loop: true,
      spaceBetween: 12,
      nested: true,
      rewind: true,
    });

    const sliderIntersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { isIntersecting } = entry;

        isIntersecting ? slider.autoplay.start() : slider.autoplay.stop();
      });
    });

    sliderIntersectionObserver.observe(panelsSlider);
  }
});
