import { isEscEvent } from './util.js';

const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorPopup.querySelector('.error__button');

const showSuccessPopup = () => {
  document.body.appendChild(successPopup);

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      successPopup.remove();
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  };

  document.addEventListener('keydown', onPopupEscKeydown);

  successPopup.addEventListener('click', () => {
    successPopup.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  });
};

const showErrorPopup = () => {
  document.body.appendChild(errorPopup);

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      errorPopup.remove();
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  };

  document.addEventListener('keydown', onPopupEscKeydown);

  errorButton.addEventListener('click', () => {
    errorPopup.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  });

  errorPopup.addEventListener('click', () => {
    errorPopup.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  });
};

export { showSuccessPopup, showErrorPopup };
