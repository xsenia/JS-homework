//popup

const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelectorAll('.popup-close'),
        popupContent = document.querySelector('.popup .popup-content');
        
    let count = 0;

    //animate  
    let viewInterval;
    let viewAnimate = function () {
        viewInterval = requestAnimationFrame(viewAnimate);
        count++;
        if(count < 38) {
            popupContent.style.left = count + '%';
        } else {
            cancelAnimationFrame(viewInterval);
            count = 0;
        }
    };

    popupBtn.forEach((elem) => {
        elem.addEventListener('click', () => {
            popup.style.display = 'block';
            let documentWidth = document.documentElement.clientWidth;
            if(documentWidth > 768) {
                viewInterval = requestAnimationFrame(viewAnimate);
            }    
            
        });
    });

    popup.addEventListener('click', (event) => {
        let target = event.target;
        if(target.classList.contains('popup-close')){
            popup.style.display = 'none';
            popupContent.style.left = count + '%';
        } else {
            target = target.closest('.popup-content');
            if(!target){
                popup.style.display = 'none';
                cancelAnimationFrame(viewInterval);
                count = 0;
            }
        }
        
    });  

};

export default togglePopup;
