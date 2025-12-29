import Swiper from "swiper";
import { Keyboard, Navigation, Scrollbar } from "swiper/modules";

/** @type {NodeListOf<HTMLDivElement>} */
const reviewsSliders = document.querySelectorAll(".reviews-slider");

reviewsSliders.forEach((reviewsSlider) => {
  /** @type {HTMLDivElement} */
  const parent = reviewsSlider.closest(".reviews__slider");
  /** @type {HTMLDivElement} */
  const scrollbar = parent.querySelector(".compact-controllers__scrollbar");
  /** @type {HTMLDivElement} */
  const next = parent.querySelector(".compact-arrows__button--next");
  /** @type {HTMLDivElement} */
  const prev = parent.querySelector(".compact-arrows__button--prev");

  const swiper = new Swiper(reviewsSlider, {
    modules: [Keyboard, Navigation, Scrollbar],

    keyboard: { enabled: true, pageUpDown: false },

    navigation: {
      enabled: true,
      nextEl: next,
      prevEl: prev,
    },

    scrollbar: {
      el: scrollbar,
      draggable: true,
      enabled: true,
    },

    // ВАЖНО:
    loop: true,        // ✅ бесконечный круг
    rewind: false,     // ✅ убрать “промотку через все”

    // Остальное
    slidesPerView: "auto",
    spaceBetween: 15,

    // Если на десктопе нужен 1 слайд:
    breakpoints: {
      600.1: { slidesPerView: 1 },
    },

    // Рекомендую при loop, когда высота слайдов разная:
    autoHeight: true,

    // Иногда полезно, если верстка/контент меняется (у тебя разворачивание текста):
    observer: true,
    observeParents: true,
  });

  /** @type {NodeListOf<HTMLButtonElement>} */
  const reviewsTextButtons = reviewsSlider.querySelectorAll(".review-card__button");

  reviewsTextButtons.forEach((reviewsTextButton) => {
    const { dataset } = reviewsTextButton;
    const { showText = "Развернуть", hideText = "Свернуть" } = dataset;

    /** @type {HTMLDivElement} */
    const previous = reviewsTextButton.previousElementSibling;

    const previousResizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { target, borderBoxSize } = entry;
        const { scrollHeight } = target;
        const { blockSize } = borderBoxSize[0];
        target.classList.toggle("review-card__inner--active", scrollHeight > blockSize + 1);
      });
    });

    previousResizeObserver.observe(previous);

    if (previous && previous.classList.contains("review-card__inner")) {
      reviewsTextButton.addEventListener("click", () => {
        reviewsTextButton.classList.toggle("review-card__button--active");
        previous.classList.toggle("review-card__inner--show");
        reviewsTextButton.textContent = previous.classList.contains("review-card__inner--show")
          ? hideText
          : showText;

        // при loop лучше так обновлять:
        swiper.updateAutoHeight?.(300);
        swiper.update();
      });
    }
  });
});
