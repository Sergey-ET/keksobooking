const DEFAULT_VALUE = 'any';

const Prices = {
  MIN: 10000,
  MAX: 50000,
};

const filter = document.querySelector('.map__filters');
const filterElements = filter.querySelectorAll('select, fieldset');
const filterType = filter.querySelector('#housing-type');
const filterPrice = filter.querySelector('#housing-price');
const filterRooms = filter.querySelector('#housing-rooms');
const filterGuests = filter.querySelector('#housing-guests');
const filterFeatures = filter.querySelector('#housing-features');

const deactivateFilter = () => {
  filter.classList.add('map__filters--disabled');
  filterElements.forEach((filterElement) => {
    filterElement.disabled = true;
  });
};

deactivateFilter();

const activateFilter = () => {
  filter.classList.remove('map__filters--disabled');
  filterElements.forEach((filterElement) => {
    filterElement.disabled = false;
  });
};

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

const checkRooms = (data) => data.offer.rooms === +filterRooms.value || filterRooms.value === DEFAULT_VALUE;

const checkGuests = (data) => data.offer.guests === +filterGuests.value || filterGuests.value === DEFAULT_VALUE;

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

const resetFilter = () => {
  filter.reset();
};

export { activateFilter, resetFilter, checkAllFilters, changeFilters };
