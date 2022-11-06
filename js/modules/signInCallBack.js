
async function signIn(event) {
    event.preventDefault()
    const inputs = Array.from(event.target.querySelectorAll('.reg'));
    const loginData = {};
    for (const input of inputs) {
        loginData[input.name] = input.value;
    }
    console.log(loginData);

    fetch('http://localhost:3000/login', {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => console.log(data))

}
