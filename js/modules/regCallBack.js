
    async function login(event){
        event.preventDefault()
        const inputs = Array.from(event.target.querySelectorAll('.reg'));
        const loginData = {};
        for(const input of inputs){
            loginData[input.name] = input.value;
        }
        console.log(loginData);

        const response = await fetch('http://localhost:3000/userlogin', {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'aplication/json'
            }
        })

        const responseJson = await response.json()
            console.log(responseJson);
        
    }
