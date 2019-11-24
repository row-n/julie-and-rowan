/* global window, document */

import './core';

export default class Toggle {
  constructor(el) {
    this.DOM = { el };
    this.DOM.trigger = this.DOM.el.dataset.toggle;
    this.DOM.target = document.querySelector(this.DOM.el.dataset.target);

    // init/bind events
    this.initEvents(el);
  }

  initEvents(el) {
    // Listen for click events
    el.addEventListener('click', (event) => {
      event.preventDefault();

      if (!event.target.classList.contains('is-active')) {
        event.target.classList.add('is-active');

        if (event.target.dataset.mdsOverlay) {
          document.body.classList.add('overlay');
        }
      } else {
        event.target.classList.remove('is-active');

        if (event.target.dataset.mdsOverlay) {
          document.body.classList.remove('overlay');
        }
      }

      if (!this.DOM.trigger) return;

      if (this.DOM.trigger === 'collapse') {
        if (this.DOM.target.classList.contains('is-visible')) {
          Toggle.collapse(this.DOM.target);
          return;
        }

        Toggle.expand(this.DOM.target);
      }

      if (this.DOM.trigger === 'toggle') {
        if (this.DOM.target.classList.contains('is-visible')) {
          Toggle.hide(this.DOM.target);
          return;
        }

        Toggle.show(this.DOM.target);
      }
    }, false);
  }

  // Show an element
  static show(elem) {
    const $el = elem;

    $el.classList.remove('is-hidden');
    $el.classList.add('is-visible');
  }

  // Hide an element
  static hide(elem) {
    const $el = elem;

    $el.classList.remove('is-visible');
    $el.classList.add('is-hidden');
  }

  // Collapse an element
  static collapse(elem) {
    const $el = elem;

    $el.style.height = `${$el.scrollHeight}px`;

    window.setTimeout(() => {
      $el.style.height = '0';
    }, 1);

    window.setTimeout(() => {
      $el.classList.remove('is-visible');
      $el.classList.add('is-hidden');
    }, 350);
  }

  // Expand an element
  static expand(elem) {
    const $el = elem;
    const getHeight = () => {
      $el.style.display = 'block';
      const height = `${$el.scrollHeight}px`;
      $el.style.display = '';
      return height;
    };

    $el.style.height = getHeight();

    window.setTimeout(() => {
      $el.style.height = '';
    }, 350);

    $el.classList.remove('is-hidden');
    $el.classList.add('is-visible');
  }
}
