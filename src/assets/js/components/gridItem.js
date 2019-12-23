/* global window, Site */

import TweenMax from '../vendor/TweenMax.min';
import './core';

export default class GridItem {
  constructor(el) {
    this.DOM = { el };
    this.DOM.inner = Array.from(this.DOM.el.children);
  }

  toggle(action) {
    let hidden = false;

    if (action === 'hide') {
      hidden = true;
    }

    this.DOM.inner.forEach((inner) => {
      const speed = Site.getRandomFloat(1, 1.5);
      const moveThumb = this.constructor.name === 'Thumb' ? -1 * window.innerHeight - 36 : -1 * window.innerHeight - 36 + inner.offsetHeight / 2;

      TweenMax.to(inner, speed, {
        delay: 0.2,
        ease: 'Quint.easeInOut',
        y: hidden ? moveThumb : 0,
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
        delay: hidden ? 0.2 : 1,
        ease: hidden ? 'Quad.easeIn' : 'Quad.easeOut',
        startAt: hidden ? {} : { opacity: 0, y: '-150%' },
        y: hidden ? '-150%' : '0%',
        opacity: hidden ? 0 : 1,
      });

      TweenMax.to(this.DOM.el.querySelector('.toggle-back'), hidden ? 0.4 : 0.2, {
        delay: hidden ? 1 : 0.2,
        ease: hidden ? 'Quad.easeOut' : 'Quad.easeIn',
        startAt: hidden ? { opacity: 0, y: '50%' } : {},
        y: hidden ? '0%' : '50%',
        opacity: hidden ? 1 : 0,
      });
    }
  }
}
