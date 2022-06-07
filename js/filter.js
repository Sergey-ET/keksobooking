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
    filterSelects[i].setAttribute('disabled', 'disabled');
  }
  for (let i = 0; i < filterFieldsets.length; i++) {
    filterFieldsets[i].setAttribute('disabled', 'disabled');
  }
};

deactivateFilter();

const activateFilter = () => {
  filter.classList.remove('map__filters--disabled');
  for (let i = 0; i < filterSelects.length; i++) {
    filterSelects[i].removeAttribute('disabled');
  }
  for (let i = 0; i < filterFieldsets.length; i++) {
    filterFieldsets[i].removeAttribute('disabled');
  }
};

export { deactivateFilter, activateFilter, filter };

// Программирование фильтров

const checkType = (data) => {
  return (
    filterType.value === data.offer.type || filterType.value === DEFAULT_VALUE
  );
};

const checkPrice = (data) => {
  if (filterPrice.value === 'low') {
    return data.offer.price < Prices.MIN;
  } else if (filterPrice.value === 'middle') {
    return data.offer.price >= Prices.MIN && data.offer.price <= Prices.MAX;
  } else if (filterPrice.value === 'high') {
    return data.offer.price > Prices.MAX;
  } else {
    return filterPrice.value === DEFAULT_VALUE;
  }
};

const checkRooms = (data) => {
  if (filterRooms.value === '1') {
    return data.offer.rooms === 1;
  } else if (filterRooms.value === '2') {
    return data.offer.rooms === 2;
  } else if (filterRooms.value === '3') {
    return data.offer.rooms === 3;
  } else {
    return filterRooms.value === DEFAULT_VALUE;
  }
};

const checkGuests = (data) => {
  if (filterGuests.value === '1') {
    return data.offer.guests === 1;
  } else if (filterGuests.value === '2') {
    return data.offer.guests === 2;
  } else if (filterGuests.value === '0') {
    return data.offer.guests === 0;
  } else {
    return filterGuests.value === DEFAULT_VALUE;
  }
};

const checkFeatures = (data) => {
  const checkedFilterFeatures = Array.from(
    filterFeatures.querySelectorAll('.map__checkbox:checked'),
  );
  const offerFeatures = data.offer.features;
  if (offerFeatures) {
    return checkedFilterFeatures.every((feature) =>
      offerFeatures.includes(feature.value),
    );
  }
};

const changeFilters = (cb) => {
  filter.addEventListener('change', () => {
    cb();
  });
};

const checkAllFilters = (data) =>
  data.filter(
    (value) =>
      checkType(value) &&
      checkPrice(value) &&
      checkRooms(value) &&
      checkGuests(value) &&
      checkFeatures(value),
  );

// Экспорт

export { checkAllFilters, changeFilters };
