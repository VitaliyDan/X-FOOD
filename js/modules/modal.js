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
export default modal;
export {closeModal};
export {openModal};
export {showResponseModal};
