
async function login(event) {
    event.preventDefault()
    const inputs = Array.from(event.target.querySelectorAll('.reg'));
    const loginData = {};
    for (const input of inputs) {
        console.log('inputs: ', input.value);
        loginData[input.name] = input.value;
    }
    console.log(loginData);

    fetch('http://localhost:3000/users', {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => console.log(data))

}
