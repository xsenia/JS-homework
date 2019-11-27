//Валидатор ввода телефона

const phoneValidator = () => {
    const input = document.querySelectorAll('.form-phone');
    input.forEach((elem) => {
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/[^0-9+]/, '');
        });
    });        
};

export default phoneValidator;