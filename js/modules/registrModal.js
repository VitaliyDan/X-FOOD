const modal = document.querySelector('.registrModal')
const openBtn = document.querySelector('#openFormBtn')
const registrBtn = document.querySelector('#regestrIn') 
const logBtn = document.querySelector('#logIn') 
const loginForm = document.querySelector('.login-form') 
const regForm = document.querySelector('.reg-form') 
const togglePasswords = document.querySelectorAll('#togglePassword')
const passwords = document.querySelectorAll('#pass')

for (const togglePassword of togglePasswords){
    togglePassword.addEventListener('click', function (e) {
        for(const password of passwords){
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password'
            password.setAttribute('type', type)
        }
        this.classList.toggle('fa-eye-slash')
    })
}
openBtn.addEventListener('click', () => {
    openModal()
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