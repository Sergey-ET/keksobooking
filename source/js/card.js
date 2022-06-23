const TYPES_IN_RUSSIAN = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const ROOM_DECLENSIONS = ['комната', 'комнаты', 'комнат'];
const GUEST_DECLENSIONS = ['гостя', 'гостей'];

const getRoomsDeclension = (n, text_forms) => {
  n = Math.abs(n) % 100;
  let n1 = n % 10;
  if (n > 10 && n < 20) {
    return text_forms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return text_forms[1];
  }
  if (n1 === 1) {
    return text_forms[0];
  }
  return text_forms[2];
};

const getGuestsDeclension = (n, text_forms) => {
  n = Math.abs(n) % 100;
  let n1 = n % 20;
  if (n1 > 1 && n1 < 20) {
    return text_forms[1];
  }
  if (n1 === 1) {
    return text_forms[0];
  }
  return text_forms[1];
};

const createFeatures = (features) => {
  const featuresFragment = document.createDocumentFragment();
  features.forEach((element) => {
    const feature = document.createElement('li');
    feature.classList.add('popup__feature', `popup__feature--${element}`);
    featuresFragment.appendChild(feature);
  });
  return featuresFragment;
};

const createPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();
  photos.forEach((photoSrc) => {
    const newPhoto = document.createElement('img');
    newPhoto.src = photoSrc;
    newPhoto.classList.add('popup__photo');
    newPhoto.alt = 'Фотография жилья';
    newPhoto.width = '45';
    newPhoto.height = '40';
    photosFragment.appendChild(newPhoto);
  });
  return photosFragment;
};

const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const renderCard = ({ author, offer }) => {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent =
    offer.price + ' ₽/ночь';
  card.querySelector('.popup__type').textContent = TYPES_IN_RUSSIAN[offer.type];
  card.querySelector('.popup__text--capacity').textContent =
    offer.rooms +
    ' ' +
    getRoomsDeclension(offer.rooms, ROOM_DECLENSIONS) +
    ' для ' +
    offer.guests +
    ' ' +
    getGuestsDeclension(offer.guests, GUEST_DECLENSIONS);
  card.querySelector('.popup__text--time').textContent =
    'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

  const cardFeatures = card.querySelector('.popup__features');
  cardFeatures.innerHTML = '';
  if (offer.features) {
    const newFeatureElements = createFeatures(offer.features);
    cardFeatures.appendChild(newFeatureElements);
  } else {
    cardFeatures.remove();
  }

  const cardDescription = card.querySelector('.popup__description');
  if (offer.description) {
    cardDescription.textContent = offer.description;
  } else {
    cardDescription.remove();
  }

  const cardPhotos = card.querySelector('.popup__photos');
  cardPhotos.innerHTML = '';
  if (offer.photos) {
    const newPhotoElements = createPhotos(offer.photos);
    cardPhotos.appendChild(newPhotoElements);
  } else {
    cardPhotos.remove();
  }

  return card;
};

export { renderCard };
