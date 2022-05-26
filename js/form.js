const COORDINATE_ACCURACY = 5;

const TitleLength = {
  MIN: 30,
  MAX: 100,
};

const MinPriceOfType = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
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

// Перевод формы в неактивное/активное состояние

const deactivateForm = () => {
  form.classList.add('ad-form--disabled');
  for (let i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].setAttribute('disabled', 'disabled');
  }
};

deactivateForm();

const activateForm = () => {
  form.classList.remove('ad-form--disabled');
  for (let i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].removeAttribute('disabled');
  }
};

// Обработка пользовательского ввода для полей «Тип жилья» и «Цена за ночь»

housingType.addEventListener('change', () => {
  housingPrice.min = MinPriceOfType[housingType.value];
  housingPrice.placeholder = MinPriceOfType[housingType.value];
});

// Обработка пользовательского ввода для полей «Время заезда» и «Время выезда»

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
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
    titleInput.style.borderColor = '#d9d9d3';
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

// Валидация поля c ценой

housingPrice.addEventListener('input', () => {
  if (housingPrice.value < MinPriceOfType[housingType.value]) {
    housingPrice.style.borderColor = 'red';
    housingPrice.setCustomValidity(
      'Минимальная цена за ночь - ' +
        MinPriceOfType[housingType.value] +
        ' руб.',
    );
  } else if (housingPrice.value > 1000000) {
    housingPrice.style.borderColor = 'red';
    housingPrice.setCustomValidity(
      'Максимальная цена за ночь - 1 000 000 руб.',
    );
  } else {
    housingPrice.style.borderColor = '#d9d9d3';
    housingPrice.setCustomValidity('');
  }

  housingPrice.reportValidity();
});

// Обработка пользовательского ввода для полей «Количество комнат» и «Количество мест»

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
    capacity.style.borderColor = '#d9d9d3';
    capacity.setCustomValidity('');
  }

  capacity.reportValidity();
};

roomNumber.addEventListener('change', onRoomsPlacesNumberChange);
capacity.addEventListener('change', onRoomsPlacesNumberChange);

// Экспорт данных

export { deactivateForm, activateForm, getAddressCoordinates };
