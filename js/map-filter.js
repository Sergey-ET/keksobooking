// Перевод фильтров в неактивное состояние

const filter = document.querySelector('.map__filters');
const filterSelects = document.querySelectorAll('.map__filters select');
const filterFieldsets = document.querySelectorAll('.map__filters fieldset');

const deactivateFilter = () => {
  filter.classList.add('map__filters--disabled');
  for (let i = 0; i < filterSelects.length; i++) {
    filterSelects[i].setAttribute('disabled', 'disabled');
  }
  for (let i = 0; i < filterFieldsets.length; i++) {
    filterFieldsets[i].setAttribute('disabled', 'disabled');
  }
};

const activateFilter = () => {
  filter.classList.remove('map__filters--disabled');
  for (let i = 0; i < filterSelects.length; i++) {
    filterSelects[i].removeAttribute('disabled');
  }
  for (let i = 0; i < filterFieldsets.length; i++) {
    filterFieldsets[i].removeAttribute('disabled');
  }
};

deactivateFilter();

export { activateFilter };
