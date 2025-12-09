class InteractiveRegion extends HTMLElement {
  /** @type {InteractiveRegionData} */
  data;
  /** @type {string} */
  href;
  /** @type {string} */
  region;

  constructor() {
    super();
  }

  connectedCallback() {
    this.data = JSON.parse(this.innerHTML.replaceAll("\n", " "));
    this.href = this.getAttribute("href");
    this.region = this.getAttribute("region");

    this.render();
  }

  disconnectedCallback() {
    this.data = undefined;
    this.href = undefined;
    this.region = undefined;
  }

  render() {
    const { color, logoRect, rect, text, textRect } = this.data;

    const region = this.renderRegion(color, rect);
    const logo = this.renderLogo(logoRect, rect);
    const link = this.renderLink(text, textRect, rect);

    region.append(logo, link);

    this.replaceWith(region);
  }

  /**
   * @param {string} color
   * @param {{ x: number[], y: number[], width: number, height: number, shape: string }} rect
   *
   * @returns {HTMLDivElement}
   */
  renderRegion(color, rect) {
    const { height, width, x: [left, right], y: [top, bottom], shape } = rect;
    const region = document.createElement("div");

    region.classList.add("interactive-region");

    region.style.setProperty("--top", top);
    region.style.setProperty("--right", right);
    region.style.setProperty("--bottom", bottom);
    region.style.setProperty("--left", left);
    region.style.setProperty("--color", `#${color}`);
    region.style.setProperty("--shape", `url(#clip-region-${this.region})`);

    return region;
  }

  /**
   * @param {{ x: number[], y: number[], width: number, height: number }} logoRect
   * @param {{ x: number[], y: number[], width: number, height: number }} rect
   *
   * @returns {HTMLDivElement}
   */
  renderLogo(logoRect, rect) {
    const { x: [logoLeft, logoRight], y: [logoTop, logoBottom] } = logoRect;
    const { height: rectHeight, width: rectWidth } = rect;
    const logo = document.createElement("div");

    logo.classList.add("interactive-region__logo");

    logo.style.setProperty("--logo-top", logoTop / rectHeight);
    logo.style.setProperty("--logo-right", logoRight / rectWidth);
    logo.style.setProperty("--logo-bottom", logoBottom / rectHeight);
    logo.style.setProperty("--logo-left", logoLeft / rectWidth);

    logo.innerHTML = `
    <svg width="100%" height="100%" aria-hidden="true">
      <use xlink:href="#icon-map-logo"></use>
    </svg>
    `;

    return logo;
  }

  /**
   * @param {string} text
   * @param {{ x: number, y: number}} textRect
   * @param {{ x: number[], y: number[], width: number, height: number }} rect
   *
   * @returns {HTMLAnchorElement}
   */
  renderLink(text, textRect, rect) {
    const { x: textLeft, y: textTop } = textRect;
    const { height: rectHeight, width: rectWidth } = rect;
    const link = document.createElement("a");

    link.href = this.href;

    link.classList.add("interactive-link");

    link.style.setProperty("--text-top", textTop / rectHeight);
    link.style.setProperty("--text-left", textLeft / rectWidth);

    link.innerHTML = `
      <span class="interactive-link__logo" aria-hidden="true">
        <svg width="30" height="32">
          <use xlink:href="#icon-map-logo"></use>
        </svg>
      </span>
      <span class="interactive-link__text">${text}</span>
      <span class="interactive-link__arrow" aria-hidden="true">
        <svg width="16" height="16">
          <use xlink:href="#icon-arrow"></use>
        </svg>
      </span>
    `;

    return link;
  }
}

customElements.define("interactive-region", InteractiveRegion);
