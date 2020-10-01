import 'smooth-scroll/dist/smooth-scroll.polyfills.min.js';
import SmoothScroll from 'smooth-scroll/dist/smooth-scroll.min.js';
import MyObserver from './MyObserver';

const waveElms = document.querySelectorAll('.increasing-waves');
const showOnEnterElms = document.querySelectorAll('.show-on-enter');
const showEntered = document.querySelectorAll('.show-when-entered');
const sideNavLinks = document.querySelectorAll('.side-nav_link');
const observer = new MyObserver();

Array.prototype.forEach.call(sideNavLinks, (el) => {
  el.addEventListener('click', closeSideNav);
});

document.getElementById('btn-menu').addEventListener('click', () => {
  document.body.classList.toggle('nav-is-open');
});

document.getElementById('overlay').addEventListener('click', closeSideNav);

var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000
});

function addVisibleClass(el) {
  el.classList.add('is-visible');
}

observer.addItem(showOnEnterElms, addVisibleClass, 0.1);
observer.addItem(showEntered, addVisibleClass, 1);

waveElms.forEach((wave) => {
  wave.addEventListener('animationend', function () {
    this.classList.remove('increasing-waves');
    this.classList.add('stable-waves');
  });
});

function closeSideNav() {
  document.body.classList.remove('nav-is-open');
}
