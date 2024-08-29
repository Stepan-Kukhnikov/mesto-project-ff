import './pages/index.css';
import  { initialCards } from './scripts/cards.js'
import { showPopup, closePopupByClick, closePopupByEscape } from './scripts/modal.js'
import { createCard, deleteCard, likeCard } from './scripts/card.js'

const template = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const personName = document.querySelector('.popup__input_type_name')
const personDescription = document.querySelector('.popup__input_type_description')

const editButton = document.querySelector('.profile__edit-button')
const addButton = document.querySelector('.profile__add-button')

const addNewCardName =  document.querySelector('.popup__input_type_card-name')
const addNewCardLink = document.querySelector('.popup__input_type_url')

const popupImage = document.querySelector('.popup__image')
const popupCaption = document.querySelector('.popup__caption')

const newCardForm = document.forms['new-place']
const editProfileForm = document.forms['edit-profile']

const cardPopup = document.querySelector('.popup_type_new-card')
const profilePopup = document.querySelector('.popup_type_edit')
const popupTypeImage = document.querySelector('.popup_type_image')

function renderCards(cardEl) {
    cardEl.forEach((element) => {
        placesList.append(createCard(element.link, element.name, element.alternative, template, openCardPopup, likeCard, deleteCard));
    })
}

function openCardPopup(link, alternative, text) {
    popupImage.src = link
    popupImage.alt = alternative
    popupCaption.textContent = text
    showPopup(popupTypeImage)
}

function changePersonData(name, description) {
    personName.value = name.textContent;
    personDescription.value = description.textContent;
}

function clearCardFormInputs() {
    addNewCardName.value = '';
    addNewCardLink.value = '';
}

function addNewCard(element) {
    element.preventDefault()
    placesList.prepend(createCard(addNewCardLink.value, addNewCardName.value, element.alternative, template, openCardPopup, likeCard, deleteCard));
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    profileTitle.textContent = personName.value;
    profileDescription.textContent = personDescription.value
}

editButton.addEventListener('click', event =>  {showPopup(profilePopup), changePersonData(profileTitle, profileDescription)})
addButton.addEventListener('click', event => {showPopup(cardPopup), clearCardFormInputs()}) 
// В указаниях к проектной работе в пункте 4, после первого скриншота есть предложение:
// "Если пользователь закрывает модальное окно нажав на крестик, то введённые значения не сохраняются."
// Поэтому функцию очистки изменений в форме после ее закрытия я оставлю, так как этого требует задание.

profilePopup.addEventListener('click', closePopupByClick)
cardPopup.addEventListener('click', closePopupByClick)

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', addNewCard)

popupTypeImage.addEventListener('click', closePopupByClick)

renderCards(initialCards);
