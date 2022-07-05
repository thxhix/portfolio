function mobileModal(backgroundPanel, openModalBtnClass, modalWindow, modalInner, modalInnerClass, closeBtn, activePanel = null) {
   let scrollY;
   let html = document.querySelector('html'),
      body = document.querySelector('body');

   // заблокировать скролл
   let disableScroll = function () {
      html.style.height = 'calc(100vh - 1px)';
      body.style.height = 'calc(100vh - 1px)';
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';

   }
   // разблокировать скролл
   let enableScroll = function () {
      html.style.height = 'auto';
      body.style.height = 'auto';
      body.style.overflow = 'visible';
      body.style.position = 'static';
   }
   // открытие модального окна
   const openModal = () => {
      scrollY = window.scrollY;
      body.style.top = `-${scrollY}px`;
      body.style.height = `calc(${scrollY}px - 1px + 100vh)`;
      backgroundPanel.classList.add('active');
      modalWindow.classList.add('active');
      disableScroll();
   }
   // закрытие модального окна
   const closeModal = () => {
      if (activePanel != null) {
         if (activePanel.classList.contains('active')) {
            modalWindow.classList.remove('active');
            backgroundPanel.classList.remove('active');
         } else {
            modalWindow.classList.remove('active');
            backgroundPanel.classList.remove('active');
            setTimeout(() => {
               enableScroll();
               body.style.top = `0px`;
               window.scrollTo(0, scrollY);
            }, 200);
         }
      } else {
         modalWindow.classList.remove('active');
         backgroundPanel.classList.remove('active');
         setTimeout(() => {
            enableScroll();
            body.style.top = `0px`;
            window.scrollTo(0, scrollY);
         }, 200);
      }
   }

   // нажатие на кнопку для открытия модального окна 
   document.addEventListener('click', (event) => {
      let target = event.target;
      if (target.closest(openModalBtnClass)) {
         if (modalInner.scrollHeight > modalWindow.offsetHeight) {
            modalWindow.style.height = '100%';
         } else {
            modalWindow.style.height = 'auto';
         }
         openModal();
      }
   })

   // нажатие на фон
   backgroundPanel.addEventListener('click', () => {
      if (modalWindow.classList.contains('active')) {
         closeModal();
      } else {
         return;
      }
   });
   // скролл по модальному окну
   modalWindow.addEventListener('swiped-down', function (e) {
      let target = e.target
      if (target.closest(modalInnerClass) && modalWindow.offsetHeight < modalInner.scrollHeight) {
         e.stopPropagation();
      } else {
         closeModal();
      }
   });
   // скролл по зоне закрытия модального окна
   closeBtn.addEventListener('swiped-down', function (e) {
      closeModal();
   });
   // нажатие на зону закрытия модального окна
   closeBtn.addEventListener('click', function (e) {
      closeModal();
   });
}
export default mobileModal