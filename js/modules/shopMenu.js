
const modal = document.querySelector('.menuModal'),
      totalContent = document.querySelector('.totalCost'),
      buy = document.querySelector('.buy');
let orders = {
    'email': '',
    'nameWare':[],
    'value': 'UAH',
    'totalCost' : 0
};
function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}

//totalCalc
let delCost = 0;
function totalValue(input,price){
   orders.totalCost += input * price;
    totalContent.textContent = `Total: ${orders.totalCost} UAH`;
}

//closeCartShop
document.querySelector('.openShop').addEventListener('click', ()=> openModal('.menuModal'));
modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == "") {
        closeModal(modal);
    }
})
function closeModal(modalSelector) {

    modalSelector.classList.add('hide');
    modalSelector.classList.remove('show');
    document.body.style.overflow = '';
}
// <------- END ------> //

//render itemsMenu

function shopMenu(obj){
    class RenderItem {
        constructor(eBtn, src,title,price,selector){
            this.eBtn = eBtn;
            this.src = src;
            this.title = title;
            this.price = price;
            this.selector = document.querySelector(selector);
            this.cartInfo = 'cartInfo';
        }

        render(){
            let element = document.createElement('div');
                element.classList.add(this.cartInfo);

        element.innerHTML = `
            <div class="left-block">
                <img src="${this.src}" alt="buy"
                    style="max-width: 60px; max-height: 70px;">
                <h3 style="margin: 1em; width: 350px;">${this.title}</h3>
            </div>
            <input type="number" min="1" max="20" data-price="${this.price}" id="currNumb" value="0"
            onchange="totalValue(this.value,${this.price})">
            <div class="right-block">
                <h3 style="margin: 1em;">Price:${this.price} UAH</h3>
                <button class="delWare"><img src="./icons/trash-bin.png" alt="trash" 
                        style="max-width: 30px;"></button>
            </div>
    `;      
             this.selector.append(element);
            element.getElementsByClassName('delWare')[0].addEventListener('click', () => {
                delCost += this.price * element.children.item(1).value;
                element.remove();
                orders.totalCost -= delCost;
                totalContent.textContent = `Total: ${orders.totalCost} UAH`;
                this.eBtn.getElementsByClassName('buyBtn')[0].classList.remove('hide');
                this.eBtn.getElementsByClassName('buyBtn')[0].classList.add('show');
                setTimeout(delCost-=delCost,100);
            });

        }


}
    new RenderItem(obj.element, obj.src, obj.title, obj.price, ".menuModal .cart-items").render();
}
//reqest
function allWares(obj){
 orders.email = JSON.parse(localStorage.user).email;
 orders.nameWare += obj.title + '; ';
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
    }, 1000);
}

async function reqestWare(event) {
    event.preventDefault();
    if(typeof orders.nameWare === 'string'){
    fetch('http://localhost:3000/userOrder', {
            method: "POST",
            body: JSON.stringify(orders),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            modal.classList.remove('show');
            modal.classList.add('hide');
            showResponseModal('Sucsessfuly buyed')
            console.log(data);
        })
    }else{
        modal.classList.remove('show');
        modal.classList.add('hide');
        showResponseModal('Choose some product');
    }
}
