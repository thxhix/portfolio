import mobileModal from "../../../common/modules/scroll-modal/script__modal-mobile.js";

document.addEventListener("DOMContentLoaded", () => {
    let background = document.querySelector(".mtModal-overlay");

    // Элементы для модального окна "Выберете дату"
    let dateOpenTrigger = ".open-date-modal",
        dateBody = document.querySelector(".mtModal.mtModal-date"),
        dateBodyInner = document.querySelector(".mtModal.mtModal-date .mtModal__inner"),
        dateBodyInnerClass = ".mtModal__inner",
        dateBodyClose = document.querySelector(".mtModal.mtModal-date .mtModal__hr");

    // Элементы для модального окна "Выберете время"
    let timeOpenTrigger = ".open-time-modal",
        timeBody = document.querySelector(".mtModal.mtModal-time"),
        timeBodyInner = document.querySelector(".mtModal.mtModal-time .mtModal__inner"),
        timeBodyInnerClass = "",
        timeBodyClose = document.querySelector(".mtModal.mtModal-time .mtModal__hr");

    // Элементы для модального окна "Причина отказа"
    let declineOpenTrigger = ".open-decline-modal",
        declineBody = document.querySelector(".mtModal.mtModal-decline"),
        declineBodyInner = document.querySelector(".mtModal.mtModal-decline .mtModal__inner"),
        declineBodyInnerClass = ".mtModal__inner",
        declineBodyClose = document.querySelector(".mtModal.mtModal-decline .close-decline-modal");

    mobileModal(background, dateOpenTrigger, dateBody, dateBodyInner, dateBodyInnerClass, dateBodyClose);
    mobileModal(background, timeOpenTrigger, timeBody, timeBodyInner, timeBodyInnerClass, timeBodyClose);
    mobileModal(background, declineOpenTrigger, declineBody, declineBodyInner, declineBodyInnerClass, declineBodyClose);
});
