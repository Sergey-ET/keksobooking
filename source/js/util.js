const ALERT_SHOW_TIME = 5000;

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
  showAlert,
  isEscEvent,
  debounce
};
