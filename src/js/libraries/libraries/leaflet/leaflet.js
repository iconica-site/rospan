import L from 'leaflet';

const mapContainer = document.getElementById('map');

if (mapContainer) {
  const mapContainerIntersectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      /** @type {{target: HTMLDivElement, isIntersecting: boolean}} */
      const { target, isIntersecting } = entry;

      if (isIntersecting) {
        initializeMap();

        observer.unobserve(target);
      }
    });
  });

  mapContainerIntersectionObserver.observe(mapContainer);

  function initializeMap() {
    const map = L.map(mapContainer, {
      center: [59.917894, 30.348585],
      zoom: 16.5,
      zoomControl: false,
      dragging: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 140">
  <path fill="#4795d1" stroke="none" d="M100 50c0 27.6-32 66.5-50 90C32.5 116 0 77.6 0 50a50 50 0 0 1 100 0"/>
  <circle cx="50" cy="50" r="38" fill="#fff" stroke="none"/>
  <path fill="#4795d1" stroke="none" d="M22 40.7 56.1 21l16.8 9.5L39 50.2z"/>
  <path fill="#195e95" stroke="none" d="M24 59.7 58.3 40 75 49.5 41 69.2z"/>
  <path fill="#da1f27" stroke="none" d="M41.9 69.7 58.5 60v18.8z"/>
</svg>`,
      iconSize: [100, 140],
      iconAnchor: [50, 70],
    });

    L.marker([59.917894, 30.348585], {
      icon: customIcon,
      interactive: false,
    }).addTo(map);
  }
}
