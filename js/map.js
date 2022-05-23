import * as L from '../leaflet/leaflet-src.esm.js';
import { activateForm, address } from './ad-form.js';
import { activateFilter } from './map-filter.js';
import { renderCard } from './card.js';
import { createAds } from './data.js';

const COORDINATE_ACCURACY = 5;
const pins = createAds();

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
    activateFilter();
  })
  .setView(
    {
      lat: 35.675,
      lng: 139.75,
    },
    13,
  );

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/pins/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.675,
    lng: 139.75,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

address.value =
  mainPinMarker.getLatLng().lat.toFixed(COORDINATE_ACCURACY) +
  ', ' +
  mainPinMarker.getLatLng().lng.toFixed(COORDINATE_ACCURACY);

mainPinMarker.on('moveend', (evt) => {
  address.value =
    evt.target.getLatLng().lat.toFixed(COORDINATE_ACCURACY) +
    ', ' +
    evt.target.getLatLng().lng.toFixed(COORDINATE_ACCURACY);
});

pins.forEach(({ offer, location, author }) => {
  const pinIcon = L.icon({
    iconUrl: './img/pins/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

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
