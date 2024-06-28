// @todo: Темплейт карточки

let cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

let placesList = document.querySelector('.places__list');

function renderCard(arrayEl, template) {

    arrayEl.forEach((element) => {

        let localCard = template.querySelector('.places__item').cloneNode(true);
        let cardImage = localCard.querySelector('.card__image');
        let cardtext = localCard.querySelector('.card__title');

        cardImage.src = element.link;
        cardtext.textContent = element.name;
        placesList.append(localCard);
    }) 
    deleteCard(); 
}


// @todo: Функция удаления карточки

function deleteCard() {
    let cardDeleteButton = document.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', function() {
        const cardsItem = cardDeleteButton.closest('.places__item');
        cardsItem.remove();
    }
    )
}

// К сожалению кнопка удаления работает только на первую карточку из списка
// много разных вариантов перепробовал, на данный момент идеи закончились, не подскажите, что я делаю не так?

// @todo: Вывести карточки на страницу

renderCard(initialCards, cardTemplate);