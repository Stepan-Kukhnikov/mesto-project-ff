import './pages/index.css';
import  { initialCards } from './scripts/cards.js'
import { showPopup, closePopupByOverlay, closePopupByEscape } from './scripts/modal.js'
import { createCard, deleteCard, likeCard } from './scripts/card.js'

const template = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const personName = document.querySelector('.popup__input_type_name')
const personDescription = document.querySelector('.popup__input_type_description')

const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')

const addnewCardName =  document.querySelector('.popup__input_type_card-name')
const addNewCardLink = document.querySelector('.popup__input_type_url')

const popupImage = document.querySelector('.popup__image')
const popupCaption = document.querySelector('.popup__caption')

const newCardForm = document.forms['new-place']

const popupElement = document.querySelector('.popup')

const contentAdd = document.querySelector('.popup_type_new-card')
const contentEdit = document.querySelector('.popup_type_edit')
const popupTypeImage = document.querySelector('.popup_type_image')

function renderCards(cardEl) {
    cardEl.forEach((element) => {
        placesList.append(createCard(element.link, element.name, element.alternative, template, cardPopup, likeCard, deleteCard));
    })
}

function cardPopup(link, text) {
    popupImage.src = link
    popupCaption.textContent = text
    showPopup(popupTypeImage)
}

function personData(name, description) {
    personName.value = name.textContent;
    personDescription.value = description.textContent;
}

function clearCard() {
    addnewCardName.value = '';
    addNewCardLink.value = '';
}

function addNewCard(element) {
    element.preventDefault()
    placesList.prepend(createCard(addNewCardLink.value, addnewCardName.value, element.alternative, template, cardPopup, likeCard, deleteCard));
}

function handleFormSubmit(evt) {
    evt.preventDefault(); 

    profileTitle.textContent = personName.value;
    profileDescription.textContent = personDescription.value
    closePopupByOverlay
}

editButton.addEventListener('click', event =>  {showPopup(contentEdit), personData(profileTitle, profileDescription)})
addButton.addEventListener('click', event => {showPopup(contentAdd), clearCard()})

contentEdit.addEventListener('click', closePopupByOverlay)
contentAdd.addEventListener('click', closePopupByOverlay)

popupElement.addEventListener('keydown', closePopupByEscape)

contentEdit.addEventListener('submit', handleFormSubmit);
newCardForm.addEventListener('submit', addNewCard)

popupTypeImage.addEventListener('click', closePopupByOverlay)


renderCards(initialCards);
