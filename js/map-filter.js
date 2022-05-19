// Перевод фильтров в неактивное состояние

const filter = document.querySelector('.map__filters');
const filterSelect = document.querySelectorAll('.map__filters select');
const filterFields = document.querySelectorAll('.map__filters fieldset');

const deactivateFilter = () => {
  filter.classList.add('map__filters--disabled');
  for (let i = 0; i < filterSelect.length; i++) {
    filterSelect[i].setAttribute('disabled', 'disabled');
  }
  for (let i = 0; i < filterFields.length; i++) {
    filterFields[i].setAttribute('disabled', 'disabled');
  }
};

const activateFilter = () => {
  filter.classList.remove('map__filters--disabled');
  for (let i = 0; i < filterSelect.length; i++) {
    filterSelect[i].removeAttribute('disabled');
  }
  for (let i = 0; i < filterFields.length; i++) {
    filterFields[i].removeAttribute('disabled');
  }
};

deactivateFilter();

export { activateFilter };
