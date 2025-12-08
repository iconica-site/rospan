import IMask from "imask";

/** @type {NodeListOf<HTMLInputElement>} */
const telInputs = document.querySelectorAll("[data-tel-input]");

telInputs.forEach(telInput => {
  /** @type {HTMLButtonElement} */
  const submitButton = telInput.closest("form").querySelector("[type=submit]");

  const mask = IMask(telInput, {
    mask: "+{7} (000) 000-00-00",
  });

  telInput.addEventListener("input", () => {
    submitButton.toggleAttribute("disabled", !mask.masked.isComplete);
  });

  telInput.addEventListener("change", () => {
    telInput.classList.toggle("error", telInput.value && !mask.masked.isComplete);
  });

  mask.on("complete", () => {
    telInput.classList.remove("error");
  });
});
