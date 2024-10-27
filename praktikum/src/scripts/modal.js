function showPopup(popup){
    popup.classList.add("popup_is-opened");
    document.addEventListener('keydown', closePopupByEscape)
}

function closePopup(element) {
    if (element.classList.contains('popup_is-opened')){
        element.classList.remove('popup_is-opened')
        element.removeEventListener('keydown', closePopupByEscape)
    }
}

function closePopupByClick(element){
    if (element.target.classList.contains('popup') || element.target.classList.contains('popup__close')){
        closePopup(element.currentTarget)
        return true;
    }
}

function closePopupByEscape(event){
    if (event.key === "Escape") {
        const openedPopup = document.querySelector(".popup_is-opened");
        closePopup(openedPopup);
    }
}

export { showPopup, closePopup, closePopupByClick, closePopupByEscape }