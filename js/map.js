import * as L from '../leaflet/leaflet-src.esm.js';
import { activateForm } from './ad-form.js';
import { activateFilter } from './map-filter.js';

const address = document.querySelector('#address');

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
    10,
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
  mainPinMarker._latlng.lat.toFixed(5) +
  ', ' +
  mainPinMarker._latlng.lng.toFixed(5);

mainPinMarker.on('moveend', (evt) => {
  address.value =
    evt.target._latlng.lat.toFixed(5) +
    ', ' +
    evt.target._latlng.lng.toFixed(5);
});
