const DEFAULT_VALUE = 'any';

const Prices = {
  MIN: 10000,
  MAX: 50000,
};

const filter = document.querySelector('.map__filters');
const filterSelects = filter.querySelectorAll('.map__filters select');
const filterFieldsets = filter.querySelectorAll('.map__filters fieldset');
const filterType = filter.querySelector('#housing-type');
const filterPrice = filter.querySelector('#housing-price');
const filterRooms = filter.querySelector('#housing-rooms');
const filterGuests = filter.querySelector('#housing-guests');
const filterFeatures = filter.querySelector('#housing-features');

// Перевод фильтров в неактивное/активное состояние

const deactivateFilter = () => {
  filter.classList.add('map__filters--disabled');
  for (let i = 0; i < filterSelects.length; i++) {
    filterSelects[i].disabled = true;
  }
  for (let i = 0; i < filterFieldsets.length; i++) {
    filterFieldsets[i].disabled = true;
  }
};

deactivateFilter();

const activateFilter = () => {
  filter.classList.remove('map__filters--disabled');
  for (let i = 0; i < filterSelects.length; i++) {
    filterSelects[i].disabled = false;
  }
  for (let i = 0; i < filterFieldsets.length; i++) {
    filterFieldsets[i].disabled = false;
  }
};

// Программирование фильтров

const checkType = (data) => filterType.value === data.offer.type || filterType.value === DEFAULT_VALUE;

const checkPrice = (data) => {
  switch (filterPrice.value) {
    case 'low':
      return data.offer.price < Prices.MIN;
    case 'middle':
      return data.offer.price >= Prices.MIN && data.offer.price <= Prices.MAX;
    case 'high':
      return data.offer.price > Prices.MAX;
    default:
      return filterPrice.value === DEFAULT_VALUE;
  }
};

const checkRooms = (data) => {
  switch (filterRooms.value) {
    case '1':
      return data.offer.rooms === 1;
    case '2':
      return data.offer.rooms === 2;
    case '3':
      return data.offer.rooms === 3;
    default:
      return filterRooms.value === DEFAULT_VALUE;
  }
};

const checkGuests = (data) => {
  switch (filterGuests.value) {
    case '1':
      return data.offer.guests === 1;
    case '2':
      return data.offer.guests === 2;
    case '0':
      return data.offer.guests === 0;
    default:
      return filterGuests.value === DEFAULT_VALUE;
  }
};

const checkFeatures = (ad = []) => {
  const selectedFeatures = [
    ...filterFeatures.querySelectorAll('.map__checkbox'),
  ]
    .filter((featureElement) => featureElement.checked);

  return (
    !selectedFeatures.length ||
    selectedFeatures.every((feature) => ad.includes(feature.value))
  );
};

const checkAllFilters = (data) =>
  data.filter(
    (value) =>
      checkType(value) &&
      checkPrice(value) &&
      checkRooms(value) &&
      checkGuests(value) &&
      checkFeatures(value.offer.features),
  );

const changeFilters = (cb) => {
  filter.addEventListener('change', () => {
    cb();
  });
};

// Сброс фильтров

const resetFilter = () => {
  filter.reset();
};

// Экспорт

export { activateFilter, resetFilter, checkAllFilters, changeFilters };
