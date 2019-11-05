/* global window, document */

import imagesLoaded from '../vendor/imagesloaded.pkgd.min';

// Preload all the images in the page..
imagesLoaded(document.querySelectorAll(['.fullview__item', '.grid__item-bg']), { background: true }, () => document.body.classList.remove('loading'));

window.Site = (function globalVars(window) {
  const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

  // from http://www.quirksmode.org/js/events_properties.html#position
  const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return { x: posx, y: posy };
  };

  // window´s size.
  let winsize = { width: window.innerWidth, height: window.innerHeight };
  // mousemove on the thumbs.
  let allowTilt = true;

  return {
    getRandomFloat,
    getMousePos,
    winsize,
    allowTilt,
  };
}(window));
