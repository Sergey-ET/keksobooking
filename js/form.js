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

// Экспорт данных

export { deactivateForm, activateForm, getAddressCoordinates };
