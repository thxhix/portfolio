document.addEventListener("DOMContentLoaded", () => {
    // Ресайзим даты в календаре при ресайзе страницы
    window.addEventListener("resize", (e) => {
        setItemHeight();
    });
    // Показываем кнопку "развернуть" у сопроводительного письма если болье 2 строк, и задаем высоту lineheight * 2
    initMessages(document.querySelectorAll(".response__message .text"), 2);
    // Запускаем календарь, и все, что с ним связано
    initCalendar();
    // Выводим доступные для выбора варианты времени
    printAvailableTime(document.querySelector(".timeline "));

    // * Click Events
    // ? Click Events
    // ! Click Events

    document.addEventListener("click", (event) => {
        target = event.target;
        // Модалка отказа - Открыть textarea если чекбокс Другое checked
        if (target.closest(".decline-form__item")) {
            openTextarea(target.closest(".decline-form__item"));
        }
        // Открыть/Закрыть спороводительное письмо
        if (target.closest(".message-text__toggle") && target.closest(".message-text__toggle").parentNode.parentNode.parentNode.classList.contains("response__message")) {
            toggleResumeMessage();
        }
        // Открыть/Закрыть спороводительное письмо
        if (target.closest(".timeline__item") && target.closest(".timeline__item").parentNode.classList.contains("timeline")) {
            setActiveTime(target.closest(".timeline__item").getAttribute("data-time"));
        }
    });

    // * DOM Loaded
    // ? DOM Loaded
    // ! DOM Loaded

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
        setItemHeight();

        let periodStart = "10.05.2022"; // Начало активного периода
        let periodEnd = "23.06.2022"; // Конец активного периода
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
                onMonthChange: (selectedDates, dateStr, instance) => {
                    setItemHeight();
                },
                onChange: (selectedDates, dateStr, instance) => {
                    setItemHeight();
                    printDate(dateStr.split("."));
                },
                onReady: (selectedDates, dateStr, instance) => {
                    setItemHeight();
                    printDate(startDate.split("."));
                    printDateInterval(periodStartDate, periodEndDate);
                },
            });
        }
    }

    // * Выводим выбранную дату
    function printDate(date) {
        let day = +date[0];
        let mounth = date[1];

        let value = document.querySelectorAll("#printValue");

        value.forEach((item) => {
            let dateContainer = item.querySelector(".value__date");
            let mounthContainer = item.querySelector(".value__mounth");

            setDate(dateContainer);
            setMounth(mounthContainer);
        });

        function setDate(el) {
            el.textContent = day;
        }

        function setMounth(el) {
            el.textContent = setMounthName(mounth);
        }
    }

    // * Показываем доступный range дат в календаре
    function printDateInterval(start, end) {
        start = start.split(".");
        let startDay = +start[0];
        let startMounth = start[1];

        end = end.split(".");
        let endDay = +end[0];
        let endMounth = end[1];

        let value = document.querySelectorAll("#printPeriod");

        value.forEach((item) => {
            let startDateContainer = item.querySelector("#periodStartDay");
            let startMounthContainer = item.querySelector("#periodStartMounth");
            let endDateContainer = item.querySelector("#periodEndDay");
            let endMounthContainer = item.querySelector("#periodEndMounth");
            setDate(startDateContainer, startDay);
            setMounth(startMounthContainer, startMounth);
            setDate(endDateContainer, endDay);
            setMounth(endMounthContainer, endMounth);
        });

        function setDate(el, val) {
            el.textContent = val;
        }
        function setMounth(el, val) {
            el.textContent = setMounthName(val);
        }
    }

    // * Выводим доступные для выбора варианты времени
    function printAvailableTime(printContainer) {
        const availableTime = ["10:30", "12:00", "12:30", "14:30", "16:30", "17:00", "17:30", "17:05"];

        print();

        // Выводим текст выбранного времени, первого доступного при загрузке
        printCurrentTime(availableTime[0]);
        // Ставим активное состояние первому доступному времени
        setActiveTime(availableTime[0]);

        function print() {
            // Чистим от дублей и выводим в контейнер
            new Set(availableTime).forEach((item) => {
                let printEl = document.createElement("div");
                printEl.className = "timeline__item text-s14-h20-w400";
                printEl.innerHTML = item;
                printEl.setAttribute("data-time", item);

                printContainer.append(printEl);
            });
        }
    }

    // * Выводим выбранное время
    function printCurrentTime(currTime) {
        let fields = document.querySelectorAll(".value__time");
        fields.forEach((item) => {
            item.textContent = currTime;
        });
    }

    // * Ставит active эелменту в таймлайне
    function setActiveTime(curr) {
        let times = document.querySelectorAll(".timeline__item");

        times.forEach((item) => {
            if (curr == item.getAttribute("data-time")) {
                // Активный элемент
                item.classList.add("active");
                printCurrentTime(curr);
            } else {
                // Остальные эл-ты
                item.classList.remove("active");
            }
        });
    }

    // * Фикс высоты всех дат в календаре
    function setItemHeight() {
        document.querySelectorAll(".calendar .flatpickr-day").forEach((item) => {
            let width = item.clientWidth;
            item.style.height = `${width}px`;
            item.style.lineHeight = `${width}px`;
        });
    }

    // * Показываем кнопку "развернуть" у сопроводительного письма если болье 2 строк, и задаем высоту lineheight * 2
    function initMessages(items, rows = 2) {
        items.forEach((item) => {
            let messageText = item.querySelector(".response__message .text p");
            let maxHeight = Number.parseInt(getElementStyle(item, "line-height")) * rows;

            item.style.maxHeight = `${maxHeight}px`;

            if (messageText.offsetHeight > maxHeight) {
                let itemToggle = item.parentNode.parentNode.querySelector(".message-text__toggle");
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

    // * Отдает стили элемента example: getElementStyle(dqs('.item', 'font-size')) => '16px'
    function getElementStyle(el, styleProp) {
        if (el.currentStyle) var y = el.currentStyle[styleProp];
        else if (window.getComputedStyle) var y = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
        return y;
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
