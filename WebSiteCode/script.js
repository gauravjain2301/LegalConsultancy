const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('nav');
menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('form')?.addEventListener('submit', event => {
  event.preventDefault();
  document.querySelector('.form-message').textContent = 'Thank you. Please add the firm email address to activate online enquiries.';
});
