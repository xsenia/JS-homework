//Валидатор ввода цифр

const validator = () => {
    const input = document.querySelectorAll('.calc-block input');
    input.forEach((elem) => {
        elem.setAttribute('type', 'text');
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/\D/g, '');
        });
    });        
};

export default validator;