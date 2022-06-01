import { isEscEvent } from './util.js';

const body = document.querySelector('body');
const successPopupTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');
const errorPopupTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');

const showSuccessPopup = () => {
  const successPopup = successPopupTemplate.cloneNode(true);
  body.appendChild(successPopup);

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      successPopup.remove();
    }
  });

  document.addEventListener('click', () => {
    successPopup.remove();
  });
};

const showErrorPopup = () => {
  const errorPopup = errorPopupTemplate.cloneNode(true);
  const errorButton = errorPopup.querySelector('.error__button');
  body.appendChild(errorPopup);

  errorButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    errorPopup.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      errorPopup.remove();
    }
  });

  document.addEventListener('click', () => {
    errorPopup.remove();
  });
};

export { showSuccessPopup, showErrorPopup };
