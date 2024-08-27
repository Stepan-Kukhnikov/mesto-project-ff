const template = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

function createCard(cardLink, cardName, cardAlternative, cardTemplate){

        const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
        const cardImage = cardItem.querySelector('.card__image');
        const cardtext = cardItem.querySelector('.card__title');
        const cardDeleteButton = cardItem.querySelector('.card__delete-button');

        cardImage.src = cardLink;
        cardImage.alt = cardAlternative;
        cardtext.textContent = cardName;
        cardDeleteButton.addEventListener('click', event => deleteCard(event.target));
        return cardItem;
}

function renderCards(cardEl) {
    cardEl.forEach((element) => {
        placesList.append(createCard(element.link, element.name, element.alternative, template));
    })
}

function deleteCard(target) {
    target.closest('.card').remove()
}

renderCards(initialCards);