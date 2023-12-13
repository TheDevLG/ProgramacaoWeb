const closePopupIcon = document.querySelector('.close-popup');
const popupModal = document.querySelector('.c-modal__popup');
const blackBackground = document.querySelector('.blackBackgroundkPopup');
closePopupIcon.addEventListener('click', function () {
    popupModal.style.display = 'none';
    blackBackground.style.display = 'none';
});
