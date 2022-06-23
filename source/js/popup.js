import { isEscEvent } from './util.js';

const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorPopup.querySelector('.error__button');
const onDocumentKeydownAdd = (evt, cb) => {
  document.addEventListener(evt, cb);
};
const onDocumentKeydownRemove = (evt, cb) => {
  document.removeEventListener(evt, cb);
};

const showSuccessPopup = () => {
  document.body.appendChild(successPopup);

  const onPopupEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      successPopup.remove();
      document.removeEventListener('keydown', onPopupEscKeydown);
    }
  };

  onDocumentKeydownAdd('keydown', onPopupEscKeydown);

  successPopup.addEventListener('click', () => {
    successPopup.remove();
    onDocumentKeydownRemove('keydown', onPopupEscKeydown);
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

  onDocumentKeydownAdd('keydown', onPopupEscKeydown);

  errorButton.addEventListener('click', () => {
    errorPopup.remove();
    onDocumentKeydownRemove('keydown', onPopupEscKeydown);
  });

  errorPopup.addEventListener('click', () => {
    errorPopup.remove();
    onDocumentKeydownRemove('keydown', onPopupEscKeydown);
  });
};

export { showSuccessPopup, showErrorPopup };
