/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards(){
    class MenuCard {
        constructor(id, src, altimg, title, descr, price, parentSelector,) {
            this.id = id;
            this.src = src;
            this.altimg = altimg;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 40;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        

        render() {
            const element = document.createElement('div');
            let status = '';
            if (localStorage.accessToken === 'undefined' || localStorage.getItem('accessToken') == null) {
               status += 'hide';
            }else {status += 'show'};


            element.innerHTML = `
                <div class="menu__item" id="${this.id}">
                    <img src=${this.src} alt=${this.altimg}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price"> 
                        <div class="menu__item-total"><span>${this.price}</span> UAH/day</div>
                        <button id= "${this.id}" class="buyBtn ${status}" onClick = "shopMenu(this)"><img style = "max-width: 100px; max-height: 65px;" src="./icons/button.png" alt="buy"></button>
                    </div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    async function getRequest(url) {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`bad request on ${url}, status: ${res.status}`);
        }
        return await res.json();
    };
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                id,
                src,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(id,src, altimg, title, descr, price, ".menu .container").render();
            });
        });
}
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/clac.js":
/*!****************************!*\
  !*** ./js/modules/clac.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function webcalc(){
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

        if(localStorage.getItem('sex')){
         sex =localStorage.getItem('sex');
        }else{
            sex= 'female';
            localStorage.setItem('sex','female');
        }
        if(localStorage.getItem('ratio')){
            sex =localStorage.getItem('ratio');
           }else{
               ratio = 1.375;
               localStorage.setItem('ratio',1.375);
           }

           function SaveToLocalStorage(selector, activeClass){
               const elements = document.querySelectorAll(selector);
               elements.forEach(element => {
                   element.classList.remove(activeClass);
                   if(element.getAttribute('id')===localStorage.getItem('sex')){
                       element.classList.add(activeClass);
                   }
                   if(element.getAttribute('data-calc')=== localStorage.getItem('ratio')){
                       element.classList.add(activeClass);
                   }
               })
           }
           SaveToLocalStorage('#gender div', 'calculating__choose-item_active');
           SaveToLocalStorage('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = ''; 
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-calc')) {
                    ratio = +e.target.getAttribute('data-calc');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-calc') );
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
         input.addEventListener('input', () => {

            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            }else{
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

             calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
 
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (webcalc);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");

function forms(){
    const forms = document.querySelectorAll('.formWare');
    const message = {
        loading: 'img/forms/spinner.svg',
        success: 'Thank you! Callback you soon',
        failure: 'Oppsss. Something is wrong...'
    };

    forms.forEach(item => {
        BindPost(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: data
        });
        return await res.json();
    };

    function BindPost(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // const request = new XMLHttpRequest();  // oldest version <---
            // request.open('POST', 'server.php');    // oldest version <---
            let statusMessage = document.createElement('img');
            statusMessage.classList.add('img_form');
            statusMessage.src = message.loading;
            statusMessage.textContent = message.loading;``
            //  form.append(statusMessage); // crash last form. fix code --->
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            // Transform in json 
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/order', json)
                .then(data => {
                    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showResponseModal)(message.success);
                    form.reset();
                    statusMessage.remove();
                }).catch(() => {
                    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showResponseModal)(message.failure);
                }).finally(() => {
                    form.reset();
                })
        });
    }

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/logout.js":
/*!******************************!*\
  !*** ./js/modules/logout.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

function logout(){
    const shopMenu = document.querySelectorAll('.logout');
    shopMenu.forEach(e => {
        e.addEventListener("click", ()=>{
            
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            location.reload();

        })
    })
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (logout);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "showResponseModal": () => (/* binding */ showResponseModal)
/* harmony export */ });
function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function showResponseModal(message) {
    const prevModal = document.querySelector('.modal__dialog');
    prevModal.classList.add('hide');
    openModal('.modal',);
    const createModal = document.createElement('div');
    createModal.classList.add('modal__dialog');
    createModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close" data-close>×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(createModal);
    setTimeout(() => {
        createModal.remove();
        prevModal.classList.add('show');
        prevModal.classList.remove('hide');
        closeModal('.modal');
    }, 2000);
}

function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}

function modal (triggerSelector, modalSelector) {
    const modalTimgaltimgrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

modalTimgaltimgrigger.forEach(btn => {
    btn.addEventListener('click', ()=> openModal(modalSelector));
});



modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == "") {
        closeModal(modalSelector);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
        closeModal();
    }
});

function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal(modalSelector);
        window.removeEventListener('scroll', showModalByScroll);
    }
}
window.addEventListener('scroll', showModalByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);





/***/ }),

/***/ "./js/modules/regModal.js":
/*!********************************!*\
  !*** ./js/modules/regModal.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* import { openModal, closeModal } from "./modal" */
 function regModal(){
const modal = document.querySelector('.registrModal')
const openBtn = document.querySelector('#openFormBtn')
const registrBtn = document.querySelector('#regestrIn') 
const logBtn = document.querySelector('#logIn') 
const loginForm = document.querySelector('.login-form') 
const regForm = document.querySelector('.reg-form') 
const passwords = document.querySelectorAll('.psswd')
const togglePasswords = document.querySelectorAll('#togglePassword')

for(let i = 0; i<passwords.length; i++) {
    togglePasswords[i].addEventListener('click', () => {
        if(togglePasswords[i].classList.contains('fa-eye-slash')) {
            togglePasswords[i].classList.remove('fa-eye-slash')
        } else {
            togglePasswords[i].classList.add('fa-eye-slash')
        }
        ChangePasswordType(passwords[i])
    })
}
openBtn.addEventListener('click', () => {
    openModal(modal)
})
modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == "") {
        closeModal(modal)
    }
})
logBtn.addEventListener('click', () => {
    regForm.classList.add('hide')
    loginForm.classList.remove('hide')
})
registrBtn.addEventListener('click', () => {
    loginForm.classList.add('hide')
    regForm.classList.remove('hide')
})
function openModal() {
    modal.classList.add('show')
    modal.classList.remove('hide')
    document.body.style.overflow = 'hidden'
}
function closeModal() {
    modal.classList.add('hide')
    modal.classList.remove('show')
    document.body.style.overflow = ''
}
function ChangePasswordType (element) {
    const type = element.getAttribute('type') === 'password' ? 'text' : 'password'
    element.setAttribute('type', type)
}

 }
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (regModal);

/***/ }),

/***/ "./js/modules/shopMenu.js":
/*!********************************!*\
  !*** ./js/modules/shopMenu.js ***!
  \********************************/
/***/ (() => {

function shopMenu(info){
    console.log(info.id);
}


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider(){
    const slides = document.querySelectorAll('.offer__slide'),
    offerSlider = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    width = window.getComputedStyle(slidesWrapper).width,
    slidesField = document.querySelector('.slider-inner');
let slideIndex = 1, offset = 0;

    function check() {
        if (slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = slides.length;
            current.textContent = slideIndex;
        }
    }check();

slidesField.style.width = 100 * slides.length + '%';
slidesWrapper.style.overflow = 'hidden'
slides.forEach(slide => {
    slide.style.width = width;
});

const indicator = document.createElement('ol'),
    dots=[];
    indicator.classList.add('butIndicator');
    offerSlider.append(indicator);
for(let i=0; i<slides.length; i++){
    let dot = document.createElement('li');
    dot.setAttribute('data-slide', i + 1);
    if(i==0){dot.style.opacity = 1};
    indicator.append(dot);
    dots.push(dot);
}



function dotsPush(){
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
};
function checkSlider(){
    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    } 
};
function clickONSlider(){
    if (offset == (+width.replace(/\D/g, '') * (slides.length - 1))) {
        offset = 0;
    } else {
        offset += +width.replace(/\D/g, '');
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }
    checkSlider();
    dotsPush();
}
next.addEventListener('click', () => {
    clickONSlider();
});
    
prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = +width.replace(/\D/g, '') * (slides.length - 1);
    } else {
        offset -= +width.replace(/\D/g, '');
    }     
    slidesField.style.transform = `translateX(-${offset}px)`;
    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }
    checkSlider(); 
    dotsPush();
});
dots.forEach(dot => {
 dot.addEventListener('click', (e)=>{
    const slideTo = e.target.getAttribute('data-slide');
    slideIndex = slideTo;
    offset = +width.replace(/\D/g, '') * (slideTo - 1);
    slidesField.style.transform = `translateX(-${offset}px)`;
    dotsPush();
    checkSlider(); 
 });
});
function autoSlider(){
    setTimeout(() => {
        check();
        clickONSlider();
        autoSlider();
    }, 4000);
}  autoSlider();
}
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(){
        
        let tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', function (event) {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer (){
    const deadline = '2022-12-24'; //set your day

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60) % 24));

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }
    setClock('.timer', deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_regModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/regModal */ "./js/modules/regModal.js");
/* harmony import */ var _modules_logout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/logout */ "./js/modules/logout.js");
/* harmony import */ var _modules_clac__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/clac */ "./js/modules/clac.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_shopMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/shopMenu */ "./js/modules/shopMenu.js");
/* harmony import */ var _modules_shopMenu__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_modules_shopMenu__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");













window.addEventListener('DOMContentLoaded', function () {
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_regModal__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_logout__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_modules_clac__WEBPACK_IMPORTED_MODULE_3__["default"])();
    // shopMenu();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('[data-modal]', '.modal');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_7__["default"])();
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_8__["default"])();
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_9__["default"])();
})
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map