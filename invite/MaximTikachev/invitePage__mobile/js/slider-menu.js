const menuLinks = document.querySelectorAll(".menu__links .item");
const menuSlider = document.querySelector(".menu__slider");
// Размер слайдера по первой кнопке меню
menuSlider.style.width = `${menuLinks[0].offsetWidth}px`;
menuSlider.style.left = `${menuLinks[0].offsetLeft}px`;

//переключение меню
function showBlock(link) {
    menuLinks.forEach(function (menuLink) {
        const idElement = menuLink.id;
        const block = document.querySelector(`.${idElement}`);
        if (link !== menuLink) {
            menuLink.classList.remove("active");
            block.classList.remove("tab--active");
        } else {
            menuLink.classList.add("active");
            block.classList.add("tab--active");
        }
    });
    // Двигаем слайдер под кнопками
    menuSlider.style.width = `${link.offsetWidth}px`;
    menuSlider.style.left = `${link.offsetLeft}px`;
}

menuLinks.forEach(function (menuLink) {
    menuLink.addEventListener("click", () => showBlock(menuLink));
});
