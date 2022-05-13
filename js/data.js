import {getRandomIntInclusive, getRandomInteger} from './util.js';

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const SIMILAR_AD_COUNT = 10;

const HALF = 0.5;

const Avatar = {
  MIN: 1,
  MAX: 10,
};

const Price = {
  MIN: 0,
  MAX: 10000,
};

const Rooms = {
  MIN: 2,
  MAX: 4,
};

const Guests = {
  MIN: 0,
  MAX: 10,
};

const X = {
  MIN: 35.65000,
  MAX: 35.70000,
  Accuracy: 5,
};

const Y = {
  MIN: 139.70000,
  MAX: 139.80000,
  Accuracy: 5,
};

const createAd = () => {
  const getLocationX = getRandomInteger(X.MIN, X.MAX, X.Accuracy);
  const getLocationY = getRandomInteger(Y.MIN, Y.MAX, Y.Accuracy);
  let getUserAvatar = getRandomIntInclusive(Avatar.MIN, Avatar.MAX);

  if (getUserAvatar < 10) {
    getUserAvatar = '0' + getUserAvatar;
  }

  return {
    author: {
      avatar: 'img/avatars/user' + getUserAvatar + '.png',
    },
    offer: {
      title: 'Уютное, недорогое жилье в отличном районе Токио',
      address: String(getLocationX + ', ' + getLocationY),
      price: getRandomIntInclusive(Price.MIN, Price.MAX),
      type: TYPES[getRandomIntInclusive(0, TYPES.length - 1)],
      rooms: getRandomIntInclusive(Rooms.MIN, Rooms.MAX),
      guests: getRandomIntInclusive(Guests.MIN, Guests.MAX),
      checkin: CHECKINS[getRandomIntInclusive(0, CHECKINS.length - 1)],
      checkout: CHECKOUTS[getRandomIntInclusive(0, CHECKOUTS.length - 1)],
      features: FEATURES.sort(() => Math.random() - HALF).slice(getRandomIntInclusive(0, FEATURES.length - 1)),
      description: 'Жильё просто замечательное!',
      photos: PHOTOS.sort(() => Math.random() - HALF).slice(getRandomIntInclusive(0, PHOTOS.length - 1)),
    },
    location: {
      x: getLocationX,
      y: getLocationY,
    },
  };
};

const createAds = () => new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());

export {createAds};
