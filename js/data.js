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
  MAX: 1000000,
};

const Rooms = {
  MIN: 0,
  MAX: 100,
};

const Guests = {
  MIN: 0,
  MAX: 100,
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
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomIntInclusive(Avatar.MIN, Avatar.MAX) + '.png',
    },
    offer: {
      title: 'Милая, уютная квартирка в центре Токио',
      address: '{{location.x}}, {{location.y}}',
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
      x: getRandomInteger(X.MIN, X.MAX, X.Accuracy),
      y: getRandomInteger(Y.MIN, Y.MAX, Y.Accuracy),
    },
  };
};

const similarAds = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());

export {similarAds};
