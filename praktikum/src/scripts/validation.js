const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

function showInputError(formElement, inputElement, errorMessage, validationSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
};

function hideInputError(formElement, inputElement, validationSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, validationSettings) {
  if (inputElement.validity.patternMismatch || inputElement.validity.typeMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessageBase)
    additionalValidation(inputElement)
  } else {
    inputElement.setCustomValidity("")
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
};

function additionalValidation(element) {
  if (element.validity.patternMismatch){
    element.setCustomValidity(element.dataset.errorMessage)
  }
}

function setEventListeners(formElement, validationSettings) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, validationSettings.inactiveButtonClass)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationSettings);
      toggleButtonState(inputList, buttonElement, validationSettings.inactiveButtonClass)
    });
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if(inputList.length === 0) {
    return
  }
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass)
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass)
  }
}

function enableValidation(validationSettings) {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationSettings);
  });
};

function clearValidation(formElement, validationConfig) {
  const inputFields = Array.from(formElement.querySelectorAll(validationConfig.inputSelector))
  toggleButtonState(
    inputFields,
    formElement.querySelector(validationConfig.submitButtonSelector),
    validationConfig.inactiveButtonClass
  );
  
  inputFields.forEach((el) => {
    hideInputError(formElement, el, validationConfig);
  });
}

export { validationParams, enableValidation, clearValidation }