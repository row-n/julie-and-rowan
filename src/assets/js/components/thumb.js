/* global document, Site, requestAnimationFrame */

import TweenMax from '../vendor/TweenMax.min';
import GridItem from './gridItem';
import './core';

export default class Thumb extends GridItem {
  constructor(el) {
    super(el);
    this.DOM.tilt = {};
    this.DOM.tilt.title = this.DOM.el.querySelector('.thumb__title');
    this.DOM.tilt.number = this.DOM.el.querySelector('.thumb__number');
    this.DOM.tilt.img = this.DOM.el.querySelector('.thumb__imgwrap > .thumb__bg');

    this.tiltconfig = {
      title: { translation: { x: [-8, 8], y: [4, -4] } },
      number: { translation: { x: [-5, 5], y: [-12, 0] } },
      img: { translation: { x: [-8, 8], y: [6, -6] } },
    };
    this.initEvents();
  }

  // tilt when mouse moving a thumb.
  initEvents() {
    let enter = false;
    this.mouseenterFn = () => {
      if (enter) {
        enter = false;
      }
      clearTimeout(this.mousetime);
      this.mousetime = setTimeout(() => enter = true, 80); // eslint-disable-line no-return-assign
    };
    this.mousemoveFn = (ev) => requestAnimationFrame(() => {
      if (!enter) return;
      this.tilt(ev);
    });
    this.mouseleaveFn = () => requestAnimationFrame(() => {
      if (!enter || !Site.allowTilt) return;
      enter = false;
      clearTimeout(this.mousetime);
      this.resetTilt();
    });
    this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
    this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
    this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
  }

  tilt(ev) {
    if (!Site.allowTilt) return;
    const mousepos = Site.getMousePos(ev);
    // Document scrolls.
    const docScrolls = {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop,
    };
    const bounds = this.DOM.el.getBoundingClientRect();
    // Mouse position relative to the main element (this.DOM.el).
    const relmousepos = {
      x: mousepos.x - bounds.left - docScrolls.left,
      y: mousepos.y - bounds.top - docScrolls.top,
    };

    // Movement settings for the tilt elements.
    Object.keys(this.DOM.tilt).forEach((key) => {
      const t = this.tiltconfig[key].translation;
      TweenMax.to(this.DOM.tilt[key], 1, {
        // ease: 'Expo.easeInOut',
        x: ((t.x[1] - t.x[0]) / bounds.width) * relmousepos.x + t.x[0],
        y: ((t.y[1] - t.y[0]) / bounds.height) * relmousepos.y + t.y[0],
      });
    });
  }

  // mouseleave: reset positions.
  resetTilt() {
    Object.keys(this.DOM.tilt).forEach((key) => {
      TweenMax.to(this.DOM.tilt[key], 2, {
        x: 0,
        y: 0,
      });
    });
  }
}
