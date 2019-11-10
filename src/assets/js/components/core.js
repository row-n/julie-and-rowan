/* global window, document */

import imagesLoaded from '../vendor/imagesloaded.pkgd.min';

// Preload all the images in the page..
imagesLoaded(document.querySelectorAll(['.fullview__item', '.thumb__bg']), { background: true }, () => document.body.classList.remove('loading'));

window.Site = (function globalVars(window) {
  const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

  // from http://www.quirksmode.org/js/events_properties.html#position
  const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    let mouseEvent = e;
    if (!mouseEvent) mouseEvent = window.event;
    if (mouseEvent.pageX || mouseEvent.pageY) {
      posx = mouseEvent.pageX;
      posy = mouseEvent.pageY;
    } else if (mouseEvent.clientX || mouseEvent.clientY) {
      posx = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return { x: posx, y: posy };
  };

  // window´s size.
  const winsize = { width: window.innerWidth, height: window.innerHeight };
  // mousemove on the thumbs.
  const allowTilt = true;

  return {
    getRandomFloat,
    getMousePos,
    winsize,
    allowTilt,
  };
}(window));
