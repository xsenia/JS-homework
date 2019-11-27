//Валидатор ввода кириллицы

const textValidator = () => {
    const input = document.querySelectorAll('.form-name, .mess');
    console.log('input: ', input);

    input.forEach((elem) => {
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/[a-z\d]/g, '');
        });
    });        
};

export default textValidator;