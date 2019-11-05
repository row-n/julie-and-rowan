/* global window, document, Site */

import TweenMax from '../vendor/TweenMax.min';
import GridItem from './gridItem';
import Thumb from './thumb';
import './core';

export default class Grid {
  constructor() {
    this.DOM = { grid: document.querySelector('.grid--thumbs') };
    // the 4 thumbs
    this.DOM.thumbs = Array.from(this.DOM.grid.querySelectorAll('.grid__item:not(.grid__item--more)'));
    this.thumbs = [];
    this.DOM.thumbs.forEach((thumb) => this.thumbs.push(new Thumb(thumb)));
    // the more/back box
    this.DOM.moreCtrl = this.DOM.grid.querySelector('.grid__item--more');
    const more = new GridItem(this.DOM.moreCtrl);
    // all the elements that are going to move up/down (thumbs + more/back button)
    this.movable = [...this.thumbs, more];
    // the colorful revealer element/panel that appears behind the images when showing/hiding a project
    this.DOM.revealer = document.querySelector('.revealer');
    // the fullview container and its items
    this.DOM.fullview = document.querySelector('.fullview');
    this.DOM.fullviewItems = this.DOM.fullview.querySelectorAll('.fullview__item');
    // current thumb/project index
    this.current = -1;
    // init/bind events
    this.initEvents();
  }

  initEvents() {
    // clicking a thumb will trigger the animation (show the project).
    this.DOM.thumbs.forEach((thumb, pos) => {
      thumb.addEventListener('click', () => {
        this.current = pos;
        this.showProject();
      });
    });

    // clicking the back button (the more/back box) will hide the project and reveal back the grid.
    this.DOM.moreCtrl.addEventListener('click', () => {
      if (!this.isGridHidden) return;
      this.hideProject();
    });

    // when resizing the window we need to reset the grid items translation positions (if the fullview is shown).
    window.addEventListener('resize', () => {
      Site.winsize = { width: window.innerWidth, height: window.innerHeight };
      if (this.isGridHidden) {
        this.movable.forEach((item) => {
          Array.from(item.DOM.el.children).forEach((child) => {
            TweenMax.set(child, {
              y: item.constructor.name === 'Thumb' ? -1 * Site.winsize.height - 30 : -1 * Site.winsize.height - 30 + child.offsetHeight / 2,
            });
          });
        });
      }
    });
  }

  showProject() {
    this.toggleProject('show');
  }

  hideProject() {
    this.toggleProject('hide');
  }

  toggleProject(action) {
    if (this.isAnimating) return;
    this.isAnimating = true;
    this.isGridHidden = action === 'show';
    Site.allowTilt = !this.isGridHidden;
    this.showRevealer().then(() => {
      this.DOM.fullviewItems[this.current].style.opacity = this.isGridHidden ? 1 : 0;
      this.DOM.fullview.style.opacity = this.isGridHidden ? 1 : 0;
      this.DOM.fullview.style.pointerEvents = this.isGridHidden ? 'auto' : 'none';
      this.hideRevealer(this.isGridHidden ? 'up' : 'down');
      this.isAnimating = false;
    });
    this.movable.forEach((item) => {
      const individual = item;
      individual.toggle(this.isGridHidden ? 'hide' : 'show');
      individual.DOM.el.style.pointerEvents = this.isGridHidden ? 'none' : 'auto';
    });
  }

  showRevealer() {
    return this.toggleRevealer('show');
  }

  hideRevealer(dir) {
    return this.toggleRevealer('hide', dir);
  }

  toggleRevealer(action, dir) {
    return new Promise((resolve) => {
      // change revealer color
      if (action === 'show') {
        this.DOM.revealer.style.backgroundColor = this.movable[this.current]
          .DOM.el.dataset.revealerColor;
      }
      // animate the revealer up or down.
      TweenMax.to(this.DOM.revealer, action === 'show' ? 1 : 1, {
        ease: action === 'show' ? 'Quint.easeInOut' : 'Quint.easeOut', y: action === 'show' ? '-100%' : dir === 'up' ? '-200%' : '0%', onComplete: resolve,
      });
    });
  }
}
