/* global window, document */

import './core';

export default class Toggle {
  constructor(el) {
    this.DOM = { el };
    this.DOM.trigger = this.DOM.el.dataset.toggle;
    this.DOM.target = document.querySelector(this.DOM.el.dataset.target);
    this.DOM.originalText = this.DOM.el.innerHTML;

    // init/bind events
    this.initEvents(el);
  }

  initEvents(el) {
    // Listen for click events
    el.addEventListener('click', (event) => {
      // event.preventDefault();

      if (!this.DOM.trigger) return;

      if (this.DOM.target.classList.contains('is-hidden')) {
        this.DOM.el.innerHTML = event.target.dataset.replacement;
      } else {
        this.DOM.el.innerHTML = this.DOM.originalText;
      }

      if (this.DOM.trigger === 'open') {
        Toggle.expand(this.DOM.target);
        return;
      }

      if (this.DOM.trigger === 'close') {
        Toggle.collapse(this.DOM.target);
        return;
      }

      if (this.DOM.trigger === 'collapse') {
        if (this.DOM.target.classList.contains('is-visible')) {
          Toggle.collapse(this.DOM.target);
          return;
        }

        Toggle.expand(this.DOM.target);
      }
    }, false);
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
