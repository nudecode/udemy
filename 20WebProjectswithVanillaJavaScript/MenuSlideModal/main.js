const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');
const callback = document.getElementById('callback')
const callback_close = document.getElementById('callback-close');
const callback_modal = document.getElementById('callback-modal');

// toggle nav

toggle.addEventListener('click', () =>
document.body.classList.toggle('show-nav')

);

// show modal 
open.addEventListener('click', () => modal.classList.add('show-modal'));
callback.addEventListener('click', () => callback_modal.classList.add('show-modal'));

// hide modal
close.addEventListener('click', () => modal.classList.remove('show-modal'));
callback_close.addEventListener('click', () => callback_modal.classList.remove('show-modal'));

// hide modal on outside click
window.addEventListener('click', e => e.target == modal ? modal.classList.romove('show-modal') : false); // in this line of code ternary operators ? for the then of the if statement and : for the else