// Функция, возвращающая случайное целое число из переданного диапазона включительно.
// Источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomIntInclusive = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max <= min) {
    [min, max] = [max, min]
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
// Источник: https://discord.com/channels/874632952691191838/874638732140101662/939926374863474729

const getRandomInteger = (min, max, accuracy = 0) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max <= min) {
    [min, max] = [max, min]
  }

  if (accuracy === 0) {
    max = Math.floor(max);
    min = Math.ceil(min);
  }

  return Number((Math.random() * (max - min) + min).toFixed(accuracy));
};

export {getRandomIntInclusive, getRandomInteger};
