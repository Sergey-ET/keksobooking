import { getData, sendData } from './api.js';
import { createPins, removePins, resetMap } from './map.js';
import { resetFilter } from './filter.js';
import { showSuccessPopup, showErrorPopup } from './popup.js';
import { resetPictures } from './picture.js';

const COORDINATE_ACCURACY = 5;
const MAX_HOUSING_PRICE = 1000000;

const TitleLength = {
  MIN: 30,
  MAX: 100,
};

const MinPriceOfType = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('.ad-form fieldset');
const housingType = form.querySelector('#type');
const housingPrice = form.querySelector('#price');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');
const address = form.querySelector('#address');
const titleInput = form.querySelector('#title');
const roomNumber = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
const resetButton = form.querySelector('.ad-form__reset');
const formInputs = form.querySelectorAll('input');
const formSelects = form.querySelectorAll('select');

const deactivateForm = () => {
  form.classList.add('ad-form--disabled');
  formFieldsets.forEach((formFieldset) => {
    formFieldset.disabled = true;
  });
};

deactivateForm();

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  formFieldsets.forEach((formFieldset) => {
    formFieldset.disabled = false;
  });
};

housingType.addEventListener('change', () => {
  housingPrice.min = MinPriceOfType[housingType.value];
  housingPrice.placeholder = MinPriceOfType[housingType.value];
});

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

const getAddressCoordinates = (coordinates) => {
  address.value =
    coordinates.lat.toFixed(COORDINATE_ACCURACY) +
    ', ' +
    coordinates.lng.toFixed(COORDINATE_ACCURACY);
};

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < TitleLength.MIN) {
    titleInput.style.borderColor = 'red';
    titleInput.setCustomValidity(
      'Слишком короткий заголовок! Пожалуйста, добавьте ещё ' +
      (TitleLength.MIN - valueLength) +
      ' символов(-а)',
    );
  } else if (valueLength > TitleLength.MAX) {
    titleInput.style.borderColor = 'red';
    titleInput.setCustomValidity(
      'Слишком длинный заголовок! Пожалуйста, удалите лишние ' +
      (valueLength - TitleLength.MAX) +
      ' символов(-а)',
    );
  } else {
    titleInput.style.borderColor = '';
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

housingPrice.addEventListener('input', () => {
  if (housingPrice.value < MinPriceOfType[housingType.value]) {
    housingPrice.style.borderColor = 'red';
    housingPrice.setCustomValidity(
      'Минимальная цена за ночь - ' +
      MinPriceOfType[housingType.value] +
      ' руб.',
    );
  } else if (housingPrice.value > MAX_HOUSING_PRICE) {
    housingPrice.style.borderColor = 'red';
    housingPrice.setCustomValidity(
      'Максимальная цена за ночь - 1 000 000 руб.',
    );
  } else {
    housingPrice.style.borderColor = '';
    housingPrice.setCustomValidity('');
  }

  housingPrice.reportValidity();
});

const onRoomsPlacesNumberChange = () => {
  if (roomNumber.value === '1' && capacity.value !== '1') {
    capacity.style.borderColor = 'red';
    capacity.setCustomValidity('Одна комната только для одного гостя!');
  } else if (
    roomNumber.value === '2' &&
    capacity.value !== '1' &&
    capacity.value !== '2'
  ) {
    capacity.style.borderColor = 'red';
    capacity.setCustomValidity(
      'Две комнаты только для одного или двух гостей!',
    );
  } else if (roomNumber.value === '3' && capacity.value === '0') {
    capacity.style.borderColor = 'red';
    capacity.setCustomValidity('Три комнаты для одного, двух или трех гостей!');
  } else if (roomNumber.value === '100' && capacity.value !== '0') {
    capacity.style.borderColor = 'red';
    capacity.setCustomValidity('Сто комнат не для гостей!');
  } else {
    capacity.style.borderColor = '';
    capacity.setCustomValidity('');
  }

  capacity.reportValidity();
};

roomNumber.addEventListener('change', onRoomsPlacesNumberChange);
capacity.addEventListener('change', onRoomsPlacesNumberChange);

const resetPrice = () => {
  housingPrice.min = MinPriceOfType[housingType.value];
  housingPrice.placeholder = MinPriceOfType[housingType.value];
}

const resetForm = () => {
  form.reset();
  formInputs.forEach((input) => input.style.borderColor = '');
  formSelects.forEach((select) => select.style.borderColor = '');
}

const resetPage = () => {
  resetFilter();
  resetForm();
  resetMap();
  resetPrice();
  removePins();
  getData((data) => createPins(data));
  resetPictures();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  resetPage();
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  sendData(
    () => {
      showSuccessPopup();
      resetPage();
    },
    showErrorPopup,
    new FormData(evt.target),
  );
});

export { activateForm, getAddressCoordinates };
