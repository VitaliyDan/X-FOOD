
function logout(){
    const shopMenu = document.querySelectorAll('.logout');
    shopMenu.forEach(e => {
        e.addEventListener("click", ()=>{
            
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            location.reload();

        })
    })
}
export default logout;