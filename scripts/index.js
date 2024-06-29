const template = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

function createCard(cardLink, cardName, cardTemplate){

        let cardItem = cardTemplate.querySelector('.card').cloneNode(true);
        let cardImage = cardItem.querySelector('.card__image');
        let cardtext = cardItem.querySelector('.card__title');
        const cardDeleteButton = cardItem.querySelector('.card__delete-button');

        cardImage.src = cardLink;
        cardtext.textContent = cardName;
        cardDeleteButton.addEventListener('click', event => deleteCard(event.target));
        return cardItem;
}

function renderCards(cardEl) {
    cardEl.forEach((element) => {
        placesList.append(createCard(element.link, element.name, template));
    })
}

function deleteCard(target) {
    target.closest('.card').remove()
}

renderCards(initialCards);