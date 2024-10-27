import { deleteCardcontent, pushLike, deleteLike } from './api'

function createCard(
    cardLink, 
    cardName,
    cardTemplate, 
    openCardPopup, 
    likeCard,
    likes, 
    anotherUserId,
    cardId,
    currentUserId,
    deleteCard
){
    const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const cardtext = cardItem.querySelector('.card__title');
    const cardDeleteButton = cardItem.querySelector('.card__delete-button');
    const likeButton = cardItem.querySelector('.card__like-button');
    const likeCounter = cardItem.querySelector('.card__like-counter');

    cardItem.id = cardId;
    cardImage.src = cardLink;
    cardImage.alt = cardName;
    cardtext.textContent = cardName;
    likeCounter.textContent = likes.length;

    if(anotherUserId !== currentUserId){
        cardDeleteButton.style = 'display: none;'
    }

    if(likes !== 0){
        likes.forEach(element => {
            if (element._id == currentUserId) {
                likeButton.classList.add('card__like-button_is-active')
            }
        });
    } else {
        likeCounter.textContent = 0
    }

    cardDeleteButton.addEventListener('click', (evt) => {
        deleteCardcontent(cardItem.id)
        .then((res) => {
            deleteCard(cardItem)
        })
    });
    
    cardImage.addEventListener('click', event => {openCardPopup(cardLink, cardName)});
    likeButton.addEventListener('click', likeCard);
    
    return cardItem;
}

function deleteCard(target) {
    target.closest('.card').remove()
}

function likeCard(event) {
    const likeTarget = event.target.closest('.card').id
    if (event.target.classList.contains('card__like-button_is-active')) {
        deleteLike(likeTarget)
        .then((res) => {
            event.target.closest('.card__like-section').querySelector('.card__like-counter').textContent = res.likes.length
            event.target.classList.remove('card__like-button_is-active')
        })
    } else {
        pushLike(likeTarget)
        .then((res) => {
            event.target.closest('.card__like-section').querySelector('.card__like-counter').textContent = res.likes.length
            event.target.classList.add('card__like-button_is-active')
        })
    }
}

export { createCard, deleteCard, likeCard }