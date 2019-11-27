//Send ajax form

const sendForm = (formId) => {
        
    const errorMessage = "Что то пошло не так",
    loadMessage = 'Загрузка...',
    successMessage = 'Спасибо, мы свяжемся с вами!';

    const form = document.getElementById(formId);

    const statusMessage = document.createElement('div');
    statusMessage.textContent = 'Тут будет сообщение';
    statusMessage.style.cssText = 'font-size: 30px;color:#19b5fe;';

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        form.appendChild(statusMessage);
        statusMessage.textContent = loadMessage;
        const formData = new FormData(form);
        let body = {}; 
        // for (let val of formData.entries()){
        //     body[val[0]] = val[1];
        // } или
        formData.forEach((val,key) => {
            body[key] = val; 
        });  
        console.log('body: ', body);

        
        
        
        postData(body)
        .then((response) => {
                if(response.status !== 200) {
                    throw new Error('статус сети не 200');
                }
                statusMessage.textContent = successMessage;
            })
        .catch((error) => {                
            statusMessage.textContent = errorMessage;
            console.log(error);
        });

        resetForm(formId);

    });
    

    const postData = (body) => {

        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
    };

    const resetForm = (formId) => {
        let form = document.getElementById(formId);            
        let dataInputs = form.querySelectorAll('input');
        dataInputs.forEach((input) => {
            input.value = '';                   
        });  
    };

};

export default sendForm;