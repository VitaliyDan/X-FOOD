const modal = document.querySelector('.menuModal'),
      totalContent = document.querySelector('.totalCost');
function openModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
}


//totalCalc
let delCost = 0;
let totalCost = 0;
function totalValue(input,price){
    totalCost += input * price;
    totalContent.textContent = `Total: ${totalCost} UAH`;
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
                totalCost -= delCost;
                totalContent.textContent = `Total: ${totalCost} UAH`;
                this.eBtn.getElementsByClassName('buyBtn')[0].classList.remove('hide');
                this.eBtn.getElementsByClassName('buyBtn')[0].classList.add('show');
                setTimeout(delCost-=delCost,100);

            });

        }

}
    new RenderItem(obj.element, obj.src, obj.title, obj.price, ".menuModal .cart-items").render();

}

