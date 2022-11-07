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


window.addEventListener('DOMContentLoaded', function () {
    cards();
    regModal();
    shop();
    calc();
    forms();
    modal('[data-modal]', '.modal');
    slider();
    tabs();
    timer();
})