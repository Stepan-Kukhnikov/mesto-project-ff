
function showPopup(popup){
    popup.classList.add('popup_is-animated')
    setTimeout(() => {
        popup.classList.add("popup_is-opened");
      }, 1)
    document.addEventListener('keydown', closePopupByEscape)
}

function closePopup(element) {
    element.classList.remove('popup_is-opened')
    element.removeEventListener('keydown', closePopupByEscape)
}

function closePopupByClick(element){
    if (element.target.classList.contains('popup') || element.target.classList.contains('popup__close') || element.target.classList.contains('popup__button')){
        closePopup(element.currentTarget)
    }
}

function closePopupByEscape(event){
    if (event.code === "Escape") {
        const openedPopup = document.querySelector(".popup_is-opened");
        openedPopup && closePopup(openedPopup);
    }
}

export { showPopup, closePopup, closePopupByClick, closePopupByEscape }