import * as L from '../leaflet/leaflet-src.esm.js';
import { activateForm, getAddressCoordinates } from './form.js';
import { activateFilter } from './filter.js';
import { renderCard } from './card.js';
import { createAds } from './data.js';

const TOKYO_CENTER = {
  lat: 35.675,
  lng: 139.75,
};

const mapZoom = 13;
const pins = createAds();

const mainPinIcon = L.icon({
  iconUrl: './img/pins/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pins/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
    activateFilter();
    getAddressCoordinates(TOKYO_CENTER);
  })
  .setView(TOKYO_CENTER, mapZoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinMarker = L.marker(TOKYO_CENTER, {
  draggable: true,
  icon: mainPinIcon,
});

mainPinMarker.addTo(map);

mainPinMarker.on('move', (evt) => {
  const positions = evt.target.getLatLng();
  getAddressCoordinates(positions);
});

pins.forEach(({ offer, location, author }) => {
  const pinMarker = L.marker(
    {
      lat: location.x,
      lng: location.y,
    },
    {
      icon: pinIcon,
    },
  );

  pinMarker.addTo(map).bindPopup(renderCard({ offer, location, author }), {
    keepInView: true,
  });
});
