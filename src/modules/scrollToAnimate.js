//scrollTo

const scrollToAnimate = () => {

    let linkNav = document.querySelectorAll('menu ul li a'),
    V = 0.7  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
    
    for (let i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener('click', function(e) {
            e.preventDefault();

            let scrollWindow = window.pageYOffset, //текущая прокрутка
                hash = this.href.replace(/[^#]*(.*)/, '$1'),  // к id элемента, к которому нужно перейти
                top = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
                start = null;
            
                requestAnimationFrame(step); 
            
                function step(time) {
                    if (start === null) start = time;
                    let progress = time - start,                    
                        distance = (top < 0 ? Math.max(scrollWindow - progress/V, scrollWindow + top) : Math.min(scrollWindow + progress/V, scrollWindow + top));

                    window.scrollTo(0,distance);
                    if (distance != scrollWindow + top) {
                        requestAnimationFrame(step)
                    } else {
                        location.hash = hash  // URL с хэшем
                    }                    
                }

        }, false);
    }
};