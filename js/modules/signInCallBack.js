    const openShop = document.querySelector('.openShop'),
          addUser = document.querySelector('.userBtn'),
          openUser = document.getElementById('openUser');

    function checkToken(){
        if(localStorage.accessToken === 'undefined' || localStorage.getItem('accessToken') == null){
          openShop.style.display = "none";
          console.log(localStorage);
      }else{
          openShop.style.display = "block";
          addUser.classList = "hide";
          openUser.classList.remove('hide');
          openUser.classList.add('show');
      }
  }

async function signIn(event) {
    event.preventDefault()

    const inputs = Array.from(event.target.querySelectorAll('.logReqest'));
    const loginData = {};
    for (const input of inputs) {
        loginData[input.name] = input.value;
    }

    const response = await fetch('http://localhost:3000/login', {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const responseData = await response.json(),
          {accessToken} = responseData;
          localStorage.accessToken = accessToken; 
          console.log(responseData);
          checkToken();




}
document.addEventListener('DOMContentLoaded',()=> checkToken());

