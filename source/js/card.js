import { getDeclension } from './util.js';

const TYPES_IN_RUSSIAN = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const ROOM_DECLENSIONS = [' комната для ', ' комнаты для ', ' комнат для '];
const GUEST_DECLENSIONS = [' гостя', ' гостей', ' гостей'];

const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

const renderCard = ({ author, offer }) => {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').innerHTML = `${offer.price} <span> ₽/ночь</span>`;
  card.querySelector('.popup__type').textContent = TYPES_IN_RUSSIAN[offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${getDeclension(offer.rooms, ROOM_DECLENSIONS)} ${offer.guests} ${getDeclension(offer.guests, GUEST_DECLENSIONS)}`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const cardFeatures = card.querySelector('.popup__features');
  cardFeatures.innerHTML = '';
  if (offer.features) {
    offer.features.forEach((element) => {
      const feature = document.createElement('li');
      feature.classList.add('popup__feature', `popup__feature--${element}`);
      cardFeatures.appendChild(feature);
    });
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
  const cardPhoto = cardPhotos.querySelector('.popup__photo');
  cardPhotos.innerHTML = '';
  if (offer.photos) {
    offer.photos.forEach((photoSrc) => {
      const newPhoto = cardPhoto.cloneNode(true);
      newPhoto.src = photoSrc;
      cardPhotos.appendChild(newPhoto);
    });
  } else {
    cardPhotos.remove();
  }

  return card;
};

export { renderCard };
