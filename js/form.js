const COORDINATE_ACCURACY = 5;

const TitleLength = {
  MIN: 30,
  MAX: 100,
};

const form = document.querySelector('.ad-form');
const formFieldsets = document.querySelectorAll('.ad-form fieldset');
const housingType = document.querySelector('#type');
const housingPrice = document.querySelector('#price');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const address = document.querySelector('#address');
const titleInput = document.querySelector('#title');

// Перевод формы в неактивное/активное состояние

const deactivateForm = () => {
  form.classList.add('ad-form--disabled');
  for (let i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].setAttribute('disabled', 'disabled');
  }
};

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  for (let i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].removeAttribute('disabled');
  }
};

// Обработка пользовательского ввода для полей «Тип жилья» и «Цена за ночь»

housingType.addEventListener('change', () => {
  if (housingType.value === 'bungalow') {
    housingPrice.min = 0;
    housingPrice.placeholder = '0';
  } else if (housingType.value === 'flat') {
    housingPrice.min = 1000;
    housingPrice.placeholder = '1000';
  } else if (housingType.value === 'house') {
    housingPrice.min = 5000;
    housingPrice.placeholder = '5000';
  } else {
    housingPrice.min = 10000;
    housingPrice.placeholder = '10000';
  }
});

// Обработка пользовательского ввода для полей «Время заезда» и «Время выезда»

timeIn.addEventListener('change', () => {
  if (timeIn.value === '12:00') {
    timeOut.value = '12:00';
  } else if (timeIn.value === '13:00') {
    timeOut.value = '13:00';
  } else {
    timeOut.value = '14:00';
  }
});

timeOut.addEventListener('change', () => {
  if (timeOut.value === '12:00') {
    timeIn.value = '12:00';
  } else if (timeOut.value === '13:00') {
    timeIn.value = '13:00';
  } else {
    timeIn.value = '14:00';
  }
});

// Заполнение поля адреса координатами

const getAddressCoordinates = (coordinates) => {
  address.value =
    coordinates.lat.toFixed(COORDINATE_ACCURACY) +
    ', ' +
    coordinates.lng.toFixed(COORDINATE_ACCURACY);
};

// Валидация поля заголовка

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < TitleLength.MIN) {
    titleInput.setCustomValidity(
      'Слишком короткий заголовок! Пожалуйста, добавьте ещё ' +
        (TitleLength.MIN - valueLength) +
        ' символов(-а)',
    );
  } else if (valueLength > TitleLength.MAX) {
    titleInput.setCustomValidity(
      'Слишком длинный заголовок! Пожалуйста, удалите лишние ' +
        (valueLength - TitleLength.MAX) +
        ' символов(-а)',
    );
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

// Экспорт данных

export { deactivateForm, activateForm, getAddressCoordinates };
