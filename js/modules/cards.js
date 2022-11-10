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
 export default cards;