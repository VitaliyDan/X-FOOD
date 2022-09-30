/* import { openModal, closeModal } from "./modal" */
function regModal(){
    const modal = document.querySelector('.registrModal')
    const openBtn = document.querySelector('#openFormBtn')
    const registrBtn = document.querySelector('#regestrIn')
    const logBtn = document.querySelector('#logIn')
    const loginForm = document.querySelector('.login-form')
    const regForm = document.querySelector('.reg-form')
    const passwords = document.querySelectorAll('#pass')
    const togglePasswords = document.querySelectorAll('#togglePassword')

    for (let i = 0; i < passwords.length; i++) {
        togglePasswords[i].addEventListener('click', () => {
            if (togglePasswords[i].classList.contains('fa-eye-slash')) {
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

    function ChangePasswordType(element) {
        const type = element.getAttribute('type') === 'password' ? 'text' : 'password'
        element.setAttribute('type', type)
    }
}
export default regModal;