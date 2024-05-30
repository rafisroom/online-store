const mobileMenuButtonElement = document.getElementById("mobile-menu-btn");
const mobileMenuElement = document.getElementById("mobile-menu");

function displayMobileMenu() {
  mobileMenuElement.classList.toggle('open');
}

mobileMenuButtonElement.addEventListener('click', displayMobileMenu);
