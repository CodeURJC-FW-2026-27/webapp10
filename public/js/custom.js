// Template behaviour (preloader, sticky header, mobile menu) without jQuery.
window.addEventListener('load', () => {
	document.getElementById('js-preloader')?.classList.add('loaded');
});

const header = document.querySelector('header');
const heading = document.querySelector('.header-text');

window.addEventListener('scroll', () => {
	if (!header || !heading) return;
	header.classList.toggle('background-header', window.scrollY >= heading.offsetHeight - header.offsetHeight);
});

const menuTrigger = document.querySelector('.menu-trigger');
const nav = document.querySelector('.header-area .nav');

menuTrigger?.addEventListener('click', () => {
	menuTrigger.classList.toggle('active');
	nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
});

// Reset the inline display when crossing the mobile breakpoint so the desktop menu is not left hidden.
window.addEventListener('resize', () => {
	if (window.innerWidth > 767 && nav) nav.style.display = '';
});
