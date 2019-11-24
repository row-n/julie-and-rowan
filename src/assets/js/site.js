/* global document */

import Grid from './components/grid';
import Toggle from './components/toggle';

const toggleEl = document.querySelector('[data-toggle]');

(() => new Grid())();
(() => new Toggle(toggleEl))();
