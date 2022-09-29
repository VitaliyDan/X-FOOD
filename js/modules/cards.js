function cards(){
    class MenuCard {
        constructor(src, altimg, title, descr, price, parentSelector,) {
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

            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.altimg} style="height:300px; object-fit: cover;">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Price:</div>
                        <div class="menu__item-total"><span>${this.price}</span> UAH/day</div>
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
                src,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(src, altimg, title, descr, price, ".menu .container").render();
            });
        });
}
 export default cards;