import './pages/index.css';
import { showPopup, closePopupByClick, closePopup } from './scripts/modal.js'
import { createCard, deleteCard, likeCard } from './scripts/card.js'
import { enableValidation, validationParams, clearValidation } from './scripts/validation.js'
import { getAllInformation, updateUserInformation, pushNewCard, updateProfileAvatar } from './scripts/api.js';

let myId = "";
const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profilePhoto = document.querySelector('.profile__image')

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
const editProfilePhoto = document.forms['new-avatar']

const cardPopup = document.querySelector('.popup_type_new-card')

const profileImagePopup = document.querySelector('.popup_type_edit_card_img')
const profileAvatarUrlField = document.querySelector('.popup__input_type_avatar-url')
const profileAvatarForm = document.querySelector('.popup_type_edit_card_img .popup__form')

const profilePopup = document.querySelector('.popup_type_edit')
const popupTypeImage = document.querySelector('.popup_type_image')

getAllInformation()
    .then((res) => {
        myId = res[0]._id
        profileTitle.textContent = res[0].name;
        profileDescription.textContent = res[0].about
        profilePhoto.setAttribute("style", `background-image: url(${res[0].avatar})`)
        renderCards(res[1])
    }
)
.catch((err) => console.log(`Произошла ошибка ${err}`))

function renderCards(cardEl) {
    cardEl.forEach((element) => {
        placesList.append(
            createCard(
                element.link, 
                element.name,
                cardTemplate, 
                openCardPopup, 
                likeCard,
                element.likes, 
                element.owner._id,
                element._id,
                myId,
                deleteCard,
            ));
    })
}

function openCardPopup(link, text) {
    popupImage.src = link
    popupCaption.textContent = text
    popupImage.alt = text
    showPopup(popupTypeImage)
}

function changePersonData(evt) {
    evt.preventDefault()
    addSaveMessage(evt)
    updateUserInformation(personName.value, personDescription.value)
    .then(() => {
        profileTitle.textContent = personName.value
        profileDescription.textContent = personDescription.value
        evt.target.reset()
        closePopup(profilePopup)
    })
    .catch((err) => console.log(`Произошла ошибка ${err}`))
    .finally((res) => addSaveMessage(evt, true))
}

function changeProfileAvatar(evt) {
    evt.preventDefault()
    addSaveMessage(evt)
    updateProfileAvatar(profileAvatarUrlField.value)
        .then((res) => {
            profilePhoto.style = `background-image: url(${profileAvatarUrlField.value});`
            profileAvatarForm.reset()
            closePopup(profileImagePopup)
        })
        .catch((err) => console.log(`Произошла ошибка ${err}`))
        .finally((res) => addSaveMessage(evt, true));
}

function addNewCard(evt) {
    evt.preventDefault()
    const name = addNewCardName.value
    const link = addNewCardLink.value
    addSaveMessage(evt)
    pushNewCard(name, link)
        .then((id) => {
            placesList.prepend(
                createCard(
                    link, 
                    name,
                    cardTemplate,
                    openCardPopup, 
                    likeCard,
                    0,
                    myId,
                    id,
                    myId,
                    deleteCard
                )
            )
        newCardForm.reset()
        closePopup(cardPopup)
    })
    .catch((err) => console.log(`Произошла ошибка ${err}`))
    .finally((res) => addSaveMessage(evt, true));
    
}

function addSaveMessage(event, loaded) {
    const popupSaveButton = event.target.querySelector('.popup__button');
    if (loaded) {
        popupSaveButton.textContent = 'Сохранить'
    } else {
        popupSaveButton.textContent = 'Сохранение...'
    } 
}

editButton.addEventListener('click', event =>  {
    personName.value = profileTitle.textContent
    personDescription.value = profileDescription.textContent
    showPopup(profilePopup);
    clearValidation(profilePopup, validationParams)
})

addButton.addEventListener('click', event => {
    newCardForm.reset()
    showPopup(cardPopup);
    clearValidation(cardPopup, validationParams)
})

profilePopup.addEventListener('click', closePopupByClick)
editProfileForm.addEventListener('submit', changePersonData)
cardPopup.addEventListener('click', closePopupByClick)
profilePhoto.addEventListener('click', event => {
    editProfilePhoto.reset()
    showPopup(profileImagePopup) 
    clearValidation(profileImagePopup, validationParams)
})
profileImagePopup.addEventListener('click', closePopupByClick)
profileImagePopup.addEventListener('submit', changeProfileAvatar)

newCardForm.addEventListener('submit', addNewCard)

popupTypeImage.addEventListener('click', closePopupByClick)

enableValidation(validationParams);
