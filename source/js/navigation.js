let mainNav = document.querySelector('.main-nav');
let navToggle = document.querySelector('.main-header__logo-button');

mainNav.classList.remove('main-nav--nojs');
mainNav.classList.add('main-nav--closed');
navToggle.classList.remove('main-header__logo-button--nojs');

navToggle.addEventListener('click', function () {
  if (mainNav.classList.contains('main-nav--closed')) {
    mainNav.classList.remove('main-nav--closed');
    navToggle.classList.add('main-header__logo-button--close');
  }
  else {
    mainNav.classList.add('main-nav--closed');
    navToggle.classList.remove('main-header__logo-button--close');
  }
});
