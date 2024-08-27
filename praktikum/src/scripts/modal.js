
function showPopup(popup){
    popup.classList.add('popup_is-opened')
    popup.classList.add('popup_is-animated')
    document.addEventListener('keydown', closePopupByEscape)
}

function closePopup(element) {
    element.classList.remove('popup_is-opened')
}

function closePopupByOverlay(element){
    if (element.target.classList.contains('popup') || element.target.classList.contains('popup__close') || element.target.classList.contains('popup__button')){
        closePopup(element.currentTarget)
    }
}

function closePopupByEscape(element){
    if (element.code === "Escape" && document.querySelector('.popup_is-opened')) {
        closePopup(document.querySelector('.popup_is-opened'))
    }
}

export { showPopup, closePopup, closePopupByOverlay, closePopupByEscape }