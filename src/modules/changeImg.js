//смена изображения
const changeImg = () => {
    const img = document.querySelectorAll('#command img');

    img.forEach((elem) => {
        let imgSrc = elem.src;
        elem.addEventListener('mouseenter', (event) => {
            event.target.src = event.target.dataset.img;
        });
        elem.addEventListener('mouseout', (event) => { 
            event.target.src = imgSrc;
        });
    });
};

export default changeImg;