function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}
function valid(event){
    const pas = document.getElementById('pass').value,
         cpas = document.getElementById('repPass').value;
         passwd = document.getElementById('repPass'),
         regBtn = document.querySelector('.btn_valid');
    for(i=0;i < cpas.length; i++)
    {
     if(pas[i] != cpas[i] && event.keyCode != 8)
     {
        passwd.classList.add('invalid');
        regBtn.classList.add('hide');
       break;
     }else{
        passwd.classList.remove('invalid');
        regBtn.classList.remove('hide');
     }
    }
    }
function showResponseModal(message) {
    const prevModal = document.querySelector('.modal__dialog');
    prevModal.classList.add('hide');
    openModal('.modal', );
    const createModal = document.createElement('div');
    createModal.classList.add('modal__dialog');
    createModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>×</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;
    const form = document.querySelector('.modal')
    form.append(createModal);
    setTimeout(() => {
        createModal.remove();
        form.classList.add('hide');
        form.classList.remove('show');
        document.body.style.overflow = '';
        location.reload();
    }, 3000);
}
const openShop = document.querySelector('.openShop'),
    addUser = document.querySelector('.openUserForm'),
    logout = document.querySelector('.logout'),
    txtResponse = document.querySelector('.txtResponse'),
    modalClose = document.querySelector('.registrModal');

function checkToken() {
    if (localStorage.accessToken === 'undefined' || localStorage.getItem('accessToken') == null) {
        openShop.style.display = "none";
        logout.style.display = "none";
    } else {
        openShop.style.display = "block";
        addUser.classList = "hide";
        logout.classList.remove('hide');
        logout.classList.add('show');
    }
}

// SignIn

async function signIn(event) {
    event.preventDefault()

    const inputs = Array.from(event.target.querySelectorAll('.logReqest'));
    const loginData = {};
    for (const input of inputs) {
        loginData[input.name] = input.value;;
    }

    const response = await fetch('http://localhost:3000/login', {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const responseData = await response.json(),
        {
            accessToken,
            user
        } = responseData;
    localStorage.accessToken = accessToken;
    localStorage.user = user;
    if (typeof responseData === 'string') {
        modalClose.classList.remove("show");
        showResponseModal(responseData);
    } else {
        modalClose.classList.remove("show");
        showResponseModal("Welcome to X-FOOD ❤️");
    }



}
document.addEventListener('DOMContentLoaded', () => checkToken());


//Registration
async function Registration(event) {
    event.preventDefault();
    const inputs = Array.from(event.target.querySelectorAll('.reg'));
    const loginData = {};
    for (const input of inputs) {
        loginData[input.name] = input.value;
        console.log(input.value)
    }

    fetch('http://localhost:3000/users', {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            localStorage.accessToken = data.accessToken;
            if(localStorage.accessToken === 'undefined' || localStorage.getItem('accessToken') == null){
                showResponseModal("This Email allready. Choose another!")
            }else{
                showResponseModal("Your account is registered!")
            }
        })
    modalClose.classList.remove('show');

}
