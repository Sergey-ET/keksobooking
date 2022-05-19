import * as L from '../leaflet/leaflet-src.esm.js';
import { activateForm } from './ad-form.js';
import { activateFilter } from './map-filter.js';

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
