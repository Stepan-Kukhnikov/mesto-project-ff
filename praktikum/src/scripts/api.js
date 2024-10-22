// идентификатор: cohort-magistr-2
// токен: 404bdb3e-523a-42b9-a675-ff10160f6873

const config = {
    baseUrl: "https://nomoreparties.co/v1/cohort-magistr-2",
    headers: {
      authorization: "404bdb3e-523a-42b9-a675-ff10160f6873",
      "Content-Type": "application/json"
    }
}

export { 
  getAllInformation,
  updateUserInformation,
  pushNewCard,
  deleteCardcontent,
  pushLike,
  deleteLike,
  updateProfileAvatar
}

const getUserInformation = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: {
        authorization: config.headers.authorization
      }
      })
      .then((res) => res.json())
}
  
const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: {
        authorization: config.headers.authorization
      }
    })
    .then((res) => res.json())
}

const updateUserInformation = (inputName, inputAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: inputName,
      about: inputAbout
    })
  }) 
  .then((res) => res.json())
}

const pushNewCard = (cardName, cardLink) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  }) 
  .then((res) => res.json())
  .then((res) => res._id)
}

const pushLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
  }) 
  .then((res) => res.json())
}

const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
  }) 
  .then((res) => res.json())
}

const deleteCardcontent = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
  }) 
  .then((res) => res.json())
}

const updateProfileAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: link
    })
  }) 
  .then((res) => res.json())
}

const getAllInformation = () => Promise.all([getUserInformation(), getInitialCards()])