import { activateForm, getAddressCoordinates } from './form.js';
import { activateFilter } from './filter.js';
import { renderCard } from './card.js';
import { getData } from './api.js';
import { showAlert, debounce } from './util.js';
import { checkAllFilters, changeFilters } from './filter.js';

const L = window.L;
const TOKYO_CENTER = {
  lat: 35.675,
  lng: 139.75,
};

const SIMILAR_AD_COUNT = 10;
const RERENDER_DELAY = 500;
const MAP_ZOOM = 13;

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

const getMap = (cb) => {
  map
    .on('load', () => {
      getAddressCoordinates(TOKYO_CENTER);
      cb();
    })
    .setView(TOKYO_CENTER, MAP_ZOOM);

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

const markerGroup = L.layerGroup().addTo(map);

const addPinMarker = (place) => {
  const pinMarker = L.marker(
    {
      lat: place.location.lat,
      lng: place.location.lng,
    },
    {
      icon: pinIcon,
    },
  );

  pinMarker.addTo(markerGroup).bindPopup(renderCard(place), {
    keepInView: true,
  });
};

const createPins = (places) => {
  places.slice(0, SIMILAR_AD_COUNT).forEach((place) => {
    addPinMarker(place);
  });
};

const removePins = () => markerGroup.clearLayers();

const resetMap = () => {
  map.setView(TOKYO_CENTER, MAP_ZOOM);
  mainPinMarker.setLatLng(TOKYO_CENTER);
  getAddressCoordinates(TOKYO_CENTER);
};

getMap(() => {
  activateForm();
  getData(
    (places) => {
      createPins(places);
      changeFilters(debounce(() => {
        removePins();
        createPins(checkAllFilters(places));
      }, RERENDER_DELAY));
      activateFilter();
    },
    (error) => showAlert(error),
  );
});

export { removePins, createPins, resetMap };
