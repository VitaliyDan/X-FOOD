
function shop(){
    const shopMenu = document.querySelectorAll('.shopBtn');
    shopMenu.forEach(e => {
        e.addEventListener("click", ()=>{
            console.log(1);
            localStorage.removeItem("accessToken");
            location.reload();

        })
    })
}
export default shop;