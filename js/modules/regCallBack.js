
async function login(event) {
    event.preventDefault();
    const inputs = Array.from(event.target.querySelectorAll('.reg')),
        modalClose = document.querySelector('.registrModal');
    const loginData = {};
    for (const input of inputs) {
        loginData[input.name] = input.value;
    }

    fetch('http://localhost:3000/users', {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => console.log(data))
        modalClose.classList.remove('show');
        modalClose.classList.add('hide');
        alert('Succsesfuly registration');
        // location.reload();
}
