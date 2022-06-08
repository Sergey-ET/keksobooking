const ALERT_SHOW_TIME = 5000;

// Функция, возвращающая случайное целое число из переданного диапазона включительно.
// Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max <= min) {
    [min, max] = [max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
// Источник: https://discord.com/channels/874632952691191838/874638732140101662/939926374863474729

const getRandomInteger = (min, max, accuracy = 0) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max <= min) {
    [min, max] = [max, min];
  }

  if (accuracy === 0) {
    max = Math.floor(max);
    min = Math.ceil(min);
  }

  return Number((Math.random() * (max - min) + min).toFixed(accuracy));
};

// Шаблон сообщения об ошибке в получении данных с сервера

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '20px 10px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'white';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

// Функция debounce для устранения 'дребезга'

const debounce = (cb, delay) => {
  let timeout;
  return function () {
    const cbCall = () => {
      cb.apply(this, arguments);
    };
    clearTimeout(timeout);
    timeout = setTimeout(cbCall, delay);
  };
};

// Экспорт

export {
  getRandomIntInclusive,
  getRandomInteger,
  showAlert,
  isEscEvent,
  debounce
};
