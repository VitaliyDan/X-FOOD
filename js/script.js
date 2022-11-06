'use strict';
import cards from './modules/cards';
import regModal from './modules/regModal';
import shop from './modules/shop';
import calc from './modules/clac';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', function () {
    const modalTimerId = setTimeout(()=> openModal('.modal', modalTimerId), 10000);
    cards();
    regModal();
    shop();
    calc();
    forms(modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    slider();
    tabs();
    timer();
})