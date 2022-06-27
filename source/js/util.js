const ALERT_SHOW_TIME = 5000;

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

const isEscEvent = (evt) => evt.key === ('Escape' || 'Esc');

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

const getDeclension = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

const toggleElements = (elements, toggle) => {
  elements.forEach((element) => {
    element.disabled = toggle;
  });
};

export { showAlert, isEscEvent, debounce, getDeclension, toggleElements };
