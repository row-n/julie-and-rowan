/* global Site */

import TweenMax from '../vendor/TweenMax.min';
import './core';

export default class GridItem {
  constructor(el) {
    this.DOM = { el };
    this.DOM.inner = Array.from(this.DOM.el.children);
  }

  toggle(action) {
    this.DOM.inner.forEach((inner) => {
      const speed = Site.getRandomFloat(1, 1.5);
      TweenMax.to(inner, speed, {
        delay: 0.2,
        ease: 'Quint.easeInOut',
        y: action === 'hide' ? this.constructor.name === 'Thumb' ? -1 * Site.winsize.height - 30 : -1 * Site.winsize.height - 30 + inner.offsetHeight / 2 : 0, // eslint-disable-line no-nested-ternary
      });

      // scale the "more/back" box as it moves.
      if (this.constructor.name !== 'Thumb') {
        TweenMax.to(inner, speed / 2, {
          delay: 0.2,
          ease: 'Quint.easeIn',
          scaleY: 2.5,
        });
        TweenMax.to(inner, speed / 2, {
          delay: 0.2 + speed / 2,
          ease: 'Quint.easeOut',
          scaleY: 1,
        });
      }
    });

    // the more box text animation (switch from "more" to "back").
    if (this.constructor.name === 'GridItem') {
      TweenMax.to(this.DOM.el.querySelector('.toggle-more'), action === 'hide' ? 0.2 : 0.4, {
        delay: action === 'hide' ? 0.2 : 1,
        ease: action === 'hide' ? 'Quad.easeIn' : 'Quad.easeOut',
        startAt: action === 'hide' ? {} : { opacity: 0, y: '-150%' },
        y: action === 'hide' ? '-150%' : '0%',
        opacity: action === 'hide' ? 0 : 1,
      });

      TweenMax.to(this.DOM.el.querySelector('.toggle-back'), action === 'hide' ? 0.4 : 0.2, {
        delay: action === 'hide' ? 1 : 0.2,
        ease: action === 'hide' ? 'Quad.easeOut' : 'Quad.easeIn',
        startAt: action === 'hide' ? { opacity: 0, y: '50%' } : {},
        y: action === 'hide' ? '0%' : '50%',
        opacity: action === 'hide' ? 1 : 0,
      });
    }
  }
}
