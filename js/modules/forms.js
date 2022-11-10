import {showResponseModal} from './modal'
function forms(){
    const forms = document.querySelectorAll('.formWare');
    const message = {
        loading: 'img/forms/spinner.svg',
        success: 'Thank you! Callback you soon',
        failure: 'Oppsss. Something is wrong...'
    };

    forms.forEach(item => {
        BindPost(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: data
        });
        return await res.json();
    };

    function BindPost(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // const request = new XMLHttpRequest();  // oldest version <---
            // request.open('POST', 'server.php');    // oldest version <---
            let statusMessage = document.createElement('img');
            statusMessage.classList.add('img_form');
            statusMessage.src = message.loading;
            statusMessage.textContent = message.loading;``
            //  form.append(statusMessage); // crash last form. fix code --->
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            // Transform in json 
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/order', json)
                .then(data => {
                    showResponseModal(message.success);
                    form.reset();
                    statusMessage.remove();
                }).catch(() => {
                    showResponseModal(message.failure);
                }).finally(() => {
                    form.reset();
                })
        });
    }

}
export default forms;