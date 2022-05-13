import {createAds} from './data.js';

const TYPES_IN_RUSSIAN = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const similarListElement = document.querySelector('#map-canvas');
const similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarCards = createAds();

const similarListFragment = document.createDocumentFragment();

similarCards.forEach(({offer, author}) => {
  const cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPES_IN_RUSSIAN[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  cardElement.querySelector('.popup__description').textContent = offer.description;
  cardElement.querySelector('.popup__avatar').src = author.avatar;

  cardElement.querySelector('.popup__features').innerHTML = '';
  for (let i = 0; i <= offer.features.length - 1; i++ ) {
    const newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature', 'popup__feature--' + offer.features[i]);
    cardElement.querySelector('.popup__features').appendChild(newFeature);

    if (!cardElement.querySelector('.popup__features').contains(newFeature)) {
      cardElement.querySelector('.popup__features').classList.add('visually-hidden');
    }
  }

  cardElement.querySelector('.popup__photos').innerHTML = '';
  for (let i = 0; i <= offer.photos.length - 1; i++ ) {
    const newPhoto = '<img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    cardElement.querySelector('.popup__photos').insertAdjacentHTML('afterbegin', newPhoto);
    cardElement.querySelector('.popup__photo').src = offer.photos[i];

    if (cardElement.querySelector('.popup__photo').src !== offer.photos[i]){
      cardElement.querySelector('.popup__photos').classList.add('visually-hidden');
    }
  }

  similarListFragment.appendChild(cardElement);
});

similarListElement.appendChild(similarListFragment);



