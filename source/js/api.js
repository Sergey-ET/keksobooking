const SERVER = {
  FROM: 'https://23.javascript.pages.academy/keksobooking/data',
  TO: 'https://23.javascript.pages.academy/keksobooking',
};

const getData = (onSuccess, onFail) => {
  fetch(SERVER.FROM)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((response) => {
      onSuccess(response);
    })
    .catch(() => {
      onFail('ОШИБКА ЗАГРУЗКИ ДАННЫХ');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(SERVER.TO, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess('Ваше объявление успешно размещено!');
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз!');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз!');
    });
};

export { getData, sendData };
