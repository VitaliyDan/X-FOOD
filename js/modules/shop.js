function shop(){
    const shopMenu = document.querySelectorAll('.shopBtn');
    shopMenu.forEach(e => {
        e.addEventListener("click", ()=>{
            console.log(1);
        })
    })
}
export default shop;