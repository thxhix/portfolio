let menu = document.querySelector("aside.menu");

let switcher = menu.querySelector(".menu__switcher");
let switcherTrigger = menu.querySelector(".menu__switcher .arrow");

document.addEventListener("DOMContentLoaded", () => {
    let menuItems = menu.querySelectorAll(".menu-list .menu-list__item");

    document.addEventListener("keydown", function (event) {
        if (document.activeElement.tagName != "INPUT" && document.activeElement.tagName != "TEXTAREA") {
            if (event.code == "BracketLeft") {
                menuMinify();
            }
        }
    });

    document.addEventListener("click", (event) => {
        target = event.target;

        // Минифицировать меню по клику на иконку
        function clickToMinify() {
            if (target.closest(".menu .menu__minify .minify")) {
                menuMinify();
            }
        }
        clickToMinify();

        // * Элементы меню
        function menuItem() {
            function itemClick() {
                if (target.closest(".menu-list .menu-list__item")) {
                    let clickTarget = target.closest(".menu-list .menu-list__item");

                    menuItems.forEach((item) => {
                        if (item == clickTarget) {
                            item.classList.add("active");
                        } else {
                            item.classList.remove("active");
                        }
                    });
                }
            }
            itemClick();
        }
        menuItem();

        //
        //
        //

        // * Switcher
        function switcherOpen() {
            let currentSwitch = switcher.getAttribute("data-value");
            let switchItems = switcher.querySelectorAll(".switcher-dropdown .switcher-dropdown__item");

            function openOnClick() {
                // При открытии меню - ставим checked активному айтему
                checkAdd(currentSwitch, switchItems);

                if (target.closest(".menu .menu__switcher")) {
                    if (!menu.classList.contains("minify")) {
                        if (!switcher.classList.contains("active")) {
                            switcher.classList.add("active");
                        } else {
                            switcher.classList.remove("active");
                        }
                    }
                } else {
                    switcher.classList.remove("active");
                }
            }
            openOnClick();

            //

            function checkAdd(curr, items) {
                items.forEach((item) => {
                    if (item.getAttribute("data-value") == curr) {
                        item.classList.add("checked");
                    } else {
                        item.classList.remove("checked");
                    }
                });
            }
        }
        switcherOpen();

        //
        //
        //

        // * Смена роли в меню
        function switcherSwitch() {
            let currentSwitch = switcher.getAttribute("data-value");

            function onItemClick() {
                if (target.closest(".switcher-dropdown .switcher-dropdown__item")) {
                    let currentClick = target.closest(".switcher-dropdown .switcher-dropdown__item");
                    let currentClickData = currentClick.getAttribute("data-value");

                    resetMenuItems();
                    selectSwitch(currentClickData, currentClick);

                    // Убираем active всем айтемам, проставляем только первому
                    function resetMenuItems() {
                        let allMenuItems = menu.querySelectorAll(".menu__row .menu-list__item");
                        let currentMenuItems = menu.querySelectorAll(`.menu-tab.${currentClickData} .menu-list__item`);

                        allMenuItems.forEach((item) => {
                            item.classList.remove("active");
                        });
                        currentMenuItems.forEach((item, key) => {
                            if (key == 0) {
                                item.classList.add("active");
                            } else {
                                item.classList.remove("active");
                            }
                        });
                    }
                }
            }
            onItemClick();
        }
        switcherSwitch();
    });

    function menuMinify() {
        let minifyHoverText = menu.querySelector(".menu__minify .minify .hover-title .title");
        menu.classList.toggle("minify");
        if (menu.classList.contains("minify")) {
            minifyHoverText.textContent = "Показать";
        } else {
            minifyHoverText.textContent = "Скрыть";
        }
    }

    function selectSwitch(data, target) {
        let switchItems = switcher.querySelectorAll(".switcher-dropdown .switcher-dropdown__item");

        let switcherTitle = switcher.querySelector(".main .title .title__text");
        let switcherSubtitle = switcher.querySelector(".main .subtitle");
        let switcherIcon = switcher.querySelector(".main .type-icon");

        // Перебираем айтемы
        switchItems.forEach((item) => {
            if (item.getAttribute("data-value") == data) {
                let tabs = menu.querySelectorAll(".menu-tab");

                // Если user - ставим почту в шапку, если нет - ставим "Мои резюме", "Мои вакансии" и тд"
                if (item.getAttribute("data-value") !== "user") {
                    let newTitle = target.querySelector(".main .title").textContent;
                    let newSubtitle = target.querySelector(".main .subtitle").textContent;

                    let newIcon = target.querySelector(".main .icon img").cloneNode(true);

                    switcherTitle.setAttribute("title", "");
                    switcherTitle.textContent = newTitle;
                    switcherSubtitle.textContent = newSubtitle;

                    switcherIcon.textContent = "";
                    switcherIcon.append(newIcon);
                } else {
                    let newTitle = target.querySelector(".main .title").textContent;
                    let newSubtitle = target.querySelector(".main .email").textContent;

                    let newIcon = target.querySelector(".main .icon img").cloneNode(true);

                    switcherTitle.setAttribute("title", newTitle);
                    switcherTitle.textContent = newTitle;
                    switcherSubtitle.textContent = newSubtitle;

                    switcherIcon.textContent = "";
                    switcherIcon.append(newIcon);
                }

                // Показываем таб, скрываем остльные
                tabs.forEach((tab) => {
                    if (tab.classList.contains(data)) {
                        tab.classList.add("active");
                    } else {
                        tab.classList.remove("active");
                    }
                });

                // Ставим класс активного айтема
                menu.classList = `menu menu--${data}`;

                // Обновляем data
                switcher.setAttribute("data-value", data);
            }
        });
    }
});
