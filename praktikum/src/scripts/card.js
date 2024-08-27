function createCard(cardLink, cardName, cardAlternative, cardTemplate, cardPopup, likeCard, deleteCard){

    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardItem.querySelector('.card__image');
    const cardtext = cardItem.querySelector('.card__title');
    const cardDeleteButton = cardItem.querySelector('.card__delete-button');
    const isLikedButton = cardItem.querySelector('.card__like-button');

    cardImage.src = cardLink;
    cardImage.alt = cardAlternative;
    cardtext.textContent = cardName;

    cardDeleteButton.addEventListener('click', event => deleteCard(event.target));
    cardImage.addEventListener('click', event => {cardPopup(cardLink, cardName)});
    cardtext.addEventListener('click', event => {cardPopup(cardLink, cardName)});
    isLikedButton.addEventListener('click', event => {likeCard(event.target)});
    
    return cardItem;
}

function deleteCard(target) {
    target.closest('.card').remove()
}

function likeCard(target) {
    target.classList.toggle('card__like-button_is-active')
}

export { createCard, deleteCard, likeCard }