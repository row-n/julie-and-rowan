/* global document */

import Grid from './components/grid';
import Toggle from './components/toggle';

const toggleEl = document.querySelectorAll('[data-toggle]');
const toggleArr = [];
toggleEl.forEach((toggle) => toggleArr.push(new Toggle(toggle)));

(() => new Grid())();
