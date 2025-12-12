/** @type {HTMLDivElement} */
const linesBlock = document.querySelector(".hero-image__lines");

if (linesBlock) {
  const lines = linesBlock.children;

  let activeIndex = 0;
  let isDrawing = false;

  function startDrawing() {
    shuffleLines();

    linesBlock.classList.add("drawing-active");

    setTimeout(() => {
      drawLine();
    }, 2000);
  }

  function shuffleLines() {
    /** @type {HTMLDivElement[]} */
    const linesArray = [...lines];

    for (let index = linesArray.length - 1; index > 0; index--) {
      const newIndex = Math.floor(Math.random() * (index + 1));

      [linesArray[index], linesArray[newIndex]] = [linesArray[newIndex], linesArray[index]];
    }

    linesBlock.replaceChildren(...linesArray);
  }

  /** @param {number} index */
  function drawLine(index = 0) {
    if (!isDrawing) return;

    activeIndex = index;

    lines[index]?.classList.add("draw-line");

    setTimeout(() => {
      lines[index] ? drawLine(++index) : clearLines();
    }, 2000);
  }

  function clearLines() {
    activeIndex = 0;

    linesBlock.classList.remove("drawing-active");

    [...lines].forEach(
      /** @param {HTMLDivElement} line */
      line => {
        line.classList.remove("draw-line");
      });

    setTimeout(() => {
      startDrawing();
    }, 2000);
  }

  const linesBlockIntersectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const { isIntersecting } = entry;

      if (isIntersecting) {
        isDrawing = true;

        if (!linesBlock.classList.contains("drawing-active")) {
          startDrawing();
        } else {
          lines[activeIndex]?.classList.contains("draw-line") ? drawLine(++activeIndex) : drawLine(activeIndex);
        }
      } else {
        isDrawing = false;
      }
    });
  });

  linesBlockIntersectionObserver.observe(linesBlock);
}
