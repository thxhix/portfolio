let scrollY,
    html = document.querySelector("html"),
    body = document.querySelector("body");

document.addEventListener("DOMContentLoaded", () => {
    // Показываем кнопку "развернуть" у сопроводительного, если больше n - кол-во символов
    showMessageToggleButton();
    // Запускаем календарь, и все, что с ним связано
    initCalendar();
    // Инициализация таймлайна
    initTimeline();
    // Выбираем первое доступное время при загрузке
    choseItemInTimeline(document.querySelector(".chose-time__item.allowed"));

    // * Click Events
    // ? Click Events
    // ! Click Events

    document.addEventListener("click", (event) => {
        let target = event.target;

        // Закрыть сообщение с информацией
        if (target.closest(".message__close") && target.closest(".message__close").parentNode.parentNode.parentNode.classList.contains("status-message")) {
            closeInfoMessage(target.closest(".message__close"));
        }

        // Закрыть сообщение с информацией
        if (target.closest(".mtModal-form__item")) {
            openTextarea(target.closest(".mtModal-form__item"));
        }

        // Открыть/Закрыть спороводительное письмо
        if (target.closest(".message-text__toggle") && target.closest(".message-text__toggle").parentNode.parentNode.classList.contains("response__message")) {
            toggleResumeMessage();
        }
        // Клик по айтему в таймлайне (выбор времени)
        if (target.closest(".chose-time__item.allowed") && target.closest(".chose-time__item.allowed").parentNode.classList.contains("chose-time__dropdown")) {
            // Выбирается кликнутое время
            choseItemInTimeline(target.closest(".chose-time__item.allowed"));
        }
        // Слушаем триггеры открытия модалок, открываем модалки
        if (target.closest(".modal-open__trigger")) {
            // Выбирается кликнутое время
            modalActions("open", target.closest(".modal-open__trigger").getAttribute("data-modal"));
        }
        // Слушаем триггеры закрытия модалок, закрываем модалки
        if (target.closest(".mtModal-overlay") || target.closest(".mtModal-actions__close")) {
            // Выбирается кликнутое время
            modalActions("close", document.querySelector(".mtModal.active").getAttribute("data-modal"));
        }
    });

    // * DOM Loaded
    // ? DOM Loaded
    // ! DOM Loaded

    function modalActions(action, modalId) {
        let modal = document.querySelector(`.mtModal-${modalId}`);
        let modalOverlay = document.querySelector(".mtModal-overlay");

        if (action == "open") {
            modalOpen();
        } else if (action == "close") {
            modalClose();
        }

        function modalOpen() {
            scrollY = window.scrollY;
            body.style.top = `-${scrollY}px`;
            body.style.height = `calc(${scrollY}px - 1px + 100vh)`;

            modal.classList.add("active");
            modalOverlay.classList.add("active");

            disableScroll();
        }

        function modalClose() {
            modal.classList.remove("active");
            modalOverlay.classList.remove("active");

            setTimeout(() => {
                enableScroll();
                body.style.top = `0px`;
                window.scrollTo(0, scrollY);
            }, 200);
        }
        // Зазблокировать скролл
        function disableScroll() {
            html.style.height = "calc(100vh - 1px)";
            body.style.height = "calc(100vh - 1px)";
            body.style.overflow = "hidden";
            body.style.position = "fixed";
        }
        // Разблокировать скролл
        function enableScroll() {
            html.style.height = "auto";
            body.style.height = "auto";
            body.style.overflow = "visible";
            body.style.position = "static";
        }
    }

    // * Клик по доступному времени в таймлайне
    function choseItemInTimeline(current) {
        // Парсим доступные позиции времени
        let allowedItems = document.querySelectorAll(".chose-date__calendar .chose-time .chose-time__item.allowed");
        // Проверка клика
        allowedItems.forEach((item) => {
            if (current.getAttribute("data-time") == item.getAttribute("data-time")) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
        setTimeValue();
        setTimeInputValue();

        function setTimeValue() {
            let timeInput = document.querySelector("#date-value__time");
            timeInput.textContent = current.getAttribute("data-time");
        }

        // Выводим выбранное время
        function setTimeInputValue() {
            let timeInput = document.querySelector("#chose-time__value");
            timeInput.textContent = current.getAttribute("data-time");
        }
    }

    // * Инициализация таймлайна, задаем рендж и проставляем data-time элементам
    function initTimeline() {
        let range = ["06:00", "10:00", "10:30", "16:30", "23:30", "14:30"];

        let timeContainer = document.querySelector(".chose-date__calendar .chose-time");
        let timeItems = timeContainer.querySelectorAll(".chose-time__item");

        itemSetData();
        itemSetActive();

        // Если время входит в range - делаем доступным для клика
        function itemSetActive() {
            range.forEach((timeItem) => {
                timeItems.forEach((item) => {
                    if (item.getAttribute("data-time") == timeItem) {
                        item.classList.add("allowed");
                    }
                });
            });
        }
        // Проставляем data-time
        function itemSetData() {
            timeItems.forEach((item) => {
                let itemData = item.textContent;
                item.setAttribute("data-time", itemData);
            });
        }
    }

    function openTextarea(curr) {
        let textarea = document.querySelector(".mtModal-form__item--textarea");
        if (curr.getAttribute("data-value") == "textarea") {
            textarea.classList.add("active");
        } else {
            textarea.classList.remove("active");
        }
    }

    // * Запуск календаря
    function initCalendar() {
        let periodStart = "10-05-2022"; // Начало активного периода
        let periodEnd = "23-05-2022"; // Конец активного периода
        let disabledDates = []; // Отключенные даты
        let defaultDate = periodStart; // Изначально активная дата (По дефолту - Первый день из периода)

        createCalendar(defaultDate, periodStart, periodEnd, disabledDates);

        function createCalendar(startDate = "today", periodStartDate = null, periodEndDate = null, disabledDates = []) {
            flatpickr.localize(flatpickr.l10ns.ru);
            flatpickr(".calendar-input", {
                inline: true,
                mode: "single",
                altInput: false,
                altFormat: "d.m.Y",
                dateFormat: "d.m.Y",
                monthSelectorType: "static",
                showMonths: 1,

                defaultDate: startDate,
                disable: disabledDates,
                minDate: periodStartDate,
                maxDate: periodEndDate,

                locale: {
                    firstDayOfWeek: 1,
                },

                onChange: function (selectedDates, dateStr, instance) {
                    printValue(dateStr.split("."));
                },
                onReady: function (selectedDates, dateStr, instance) {
                    printValueHeader("start", periodStartDate.split("-"));
                    printValueHeader("end", periodEndDate.split("-"));

                    printValue(periodStartDate.split("-"));
                },
            });
        }
    }

    // * Показываем кнопку "развернуть" у сопроводительного, если больше n - кол-во символов
    function showMessageToggleButton() {
        let messages = document.querySelectorAll(".response__message .text");
        messages.forEach((item) => {
            let messageText = item.querySelector(".response__message .text p");

            if (messageText.offsetHeight > 44) {
                let itemToggle = item.parentNode.querySelector(".message-text__toggle");
                itemToggle.classList.add("active");
            }
        });
    }

    // * Открыть/Закрыть спороводительное письмо
    function toggleResumeMessage() {
        let toggle = target.closest(".message-text__toggle");
        let message = toggle.parentNode.parentNode.querySelector(".text");
        message.classList.toggle("active");
        if (message.classList.contains("active")) {
            toggle.textContent = "Свернуть";
        } else if (!message.classList.contains("active")) {
            toggle.textContent = "Развернуть";
        }
    }

    // * Закрыть сообщение с информацией (" ! Вы ещё не приняли приглашение" и т.д)
    function closeInfoMessage(item) {
        let message = item.parentNode.parentNode.parentNode;
        message.classList.add("closed");
    }

    // * Выводим выбранную дату и время
    function printValue(date) {
        let day = date[0];
        let mounth = date[1];
        let year = date[2];

        setDateInputValue();
        setChoseValue();

        // Ставим первое доступное время, и выводим его
        choseItemInTimeline(document.querySelector(".chose-time__item.allowed"));

        // Выводим под календарем: "Вы выбрали d m, время начала h"
        function setChoseValue() {
            let dayInput = document.querySelector("#date-value__day");
            let mounthInput = document.querySelector("#date-value__mounth");
            dayInput.textContent = day = +day;
            mounthInput.textContent = setMounthName(mounth);
        }
        // Выводим над календарем в инпут: "d m y"
        function setDateInputValue() {
            let dayInput = document.querySelector("#calendar-value__day");
            let mounthInput = document.querySelector("#calendar-value__mounth");
            let yearInput = document.querySelector("#calendar-value__year");

            dayInput.textContent = day = +day;
            mounthInput.textContent = setMounthName(mounth);
            yearInput.textContent = year;
        }
    }

    function printValueHeader(action, date) {
        let day = date[0];
        let mounth = date[1];

        if (action == "start") {
            setStart();
        } else if (action == "end") {
            setEnd();
        }

        // Выводим под календарем: "Вы выбрали d m, время начала h"
        function setStart() {
            let dayInput = document.querySelector("#startIntervalDay");
            let mounthInput = document.querySelector("#startIntervalMounth");
            dayInput.textContent = day = +day;
            mounthInput.textContent = setMounthName(mounth);
        }

        // Выводим под календарем: "Вы выбрали d m, время начала h"
        function setEnd() {
            let dayInput = document.querySelector("#endIntervalDay");
            let mounthInput = document.querySelector("#endIntervalMounth");
            dayInput.textContent = day = +day;
            mounthInput.textContent = setMounthName(mounth);
        }
    }

    // Выставляем имя месяца: 04 = апреля
    function setMounthName(mounth) {
        switch (mounth) {
            case "01":
                mounth = "января";
                break;
            case "02":
                mounth = "февраля";
                break;
            case "03":
                mounth = "марта";
                break;
            case "04":
                mounth = "апреля";
                break;
            case "05":
                mounth = "мая";
                break;
            case "06":
                mounth = "июня";
                break;
            case "07":
                mounth = "июля";
                break;
            case "08":
                mounth = "августа";
                break;
            case "09":
                mounth = "сентября";
                break;
            case "10":
                mounth = "октября";
                break;
            case "11":
                mounth = "ноября";
                break;
            case "12":
                mounth = "декабря";
                break;
            default:
                break;
        }

        return mounth;
    }
});