// идентификатор: cohort-magistr-2
// токен: 404bdb3e-523a-42b9-a675-ff10160f6873

const config = {
    baseUrl: "https://nomoreparties.co/v1/cohort-magistr-2",
    headers: {
      authorization: "404bdb3e-523a-42b9-a675-ff10160f6873",
      "Content-Type": "application/json"
    }
}

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

const getUserInformation = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: {
        authorization: config.headers.authorization
      }
      })
      .then(checkResponse)
}
  
const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: {
        authorization: config.headers.authorization
      }
    })
    .then(checkResponse)
}

const updateUserInformation = (inputName, inputAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      name: inputName,
      about: inputAbout
    })
  }) 
  .then(checkResponse)
}

const pushNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  }) 
  .then(checkResponse)
  .then((res) => res._id)
}

const pushLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
  }) 
  .then(checkResponse)
}

const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
  }) 
  .then(checkResponse)
}

const deleteCardcontent = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
  }) 
  .then(checkResponse)
}

const updateProfileAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      avatar: link
    })
  }) 
  .then(checkResponse)
}

const getAllInformation = () => Promise.all([getUserInformation(), getInitialCards()])

export { 
  getAllInformation,
  updateUserInformation,
  pushNewCard,
  deleteCardcontent,
  pushLike,
  deleteLike,
  updateProfileAvatar
}