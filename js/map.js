import { activateForm, getAddressCoordinates } from './form.js';
import { activateFilter } from './filter.js';
import { renderCard } from './card.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const L = window.L;
const TOKYO_CENTER = {
  lat: 35.675,
  lng: 139.75,
};

const SIMILAR_AD_COUNT = 10;

const mapZoom = 13;

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

const map = L.map('map-canvas');

const getMap = (callBackFunction) => {
  map
    .on('load', () => {
      activateForm();
      activateFilter();
      getAddressCoordinates(TOKYO_CENTER);
      callBackFunction();
    })
    .setView(TOKYO_CENTER, mapZoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
};

const mainPinMarker = L.marker(TOKYO_CENTER, {
  draggable: true,
  icon: mainPinIcon,
});

mainPinMarker.addTo(map);

mainPinMarker.on('move', (evt) => {
  const positions = evt.target.getLatLng();
  getAddressCoordinates(positions);
});

const createPins = (pins) => {
  pins.forEach((data) => {
    const pinMarker = L.marker(
      {
        lat: data.location.lat,
        lng: data.location.lng,
      },
      {
        icon: pinIcon,
      },
    );

    pinMarker.addTo(map).bindPopup(renderCard(data), {
      keepInView: true,
    });
  });
};

getMap(() => {
  getData(
    (json) => {
      createPins(json.slice(0, SIMILAR_AD_COUNT));
    },
    (error) => showAlert(error),
  );
});

export { TOKYO_CENTER, mapZoom, map, mainPinMarker };
