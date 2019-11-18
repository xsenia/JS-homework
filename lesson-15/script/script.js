window.addEventListener('DOMContentLoaded', function() {
    'use strict';
   

    //timer
    function countTimer (deadline) {
        let timerHours = document.querySelector('#timer-hours'),
            timerminutes = document.querySelector('#timer-minutes'),
            timerseconds = document.querySelector('#timer-seconds'),
            timerBlock = document.querySelector('#timer');
            
        function getTimeRemaining () {            
            let dateStop = new Date(deadline).getTime(),            
            dateNow = new Date().getTime(),            
            timeRemainning = (dateStop - dateNow)/1000,
            seconds = Math.floor(timeRemainning % 60),
            minuts = Math.floor((timeRemainning / 60) % 60),
            hours = Math.floor(timeRemainning / 60 / 60),
            day = Math.floor(timeRemainning / 60 / 60 / 24); 

            if(hours < 10 && hours >= 0 ) {
                hours = '0' + hours;                
            }
            if(minuts < 10 && minuts >= 0) {
                minuts = '0' + minuts;
            }
            if(seconds < 10 && seconds >= 0) {
                seconds = '0' + seconds;
            }
            
            
            return {timeRemainning, hours, minuts, seconds };
        }

        function updateClock () {
            let timer = getTimeRemaining();
            timerHours.textContent = timer.hours;
            timerminutes.textContent = timer.minuts;
            timerseconds.textContent = timer.seconds; 
           

            if (timer.hours < 0) { 
                timerBlock.style.color = "red";
                timerHours.textContent = '00';
                timerminutes.textContent = '00';
                timerseconds.textContent = '00';  
            }
        }
            
        updateClock ();

    }
    
    
    setInterval(countTimer, 1000, '19 december 2019');


    //menu

    const toggleMenu = () => {

        const menu = document.querySelector('menu'),
            body = document.querySelector('body'); 

        body.addEventListener(('click'), (event) => {
            let target = event.target;

            if(target.closest('menu') && menu.classList.contains('active-menu')) { 
                if(target.tagName !== 'MENU') {
                    if(target.tagName === 'A'){ 
                        menu.classList.remove('active-menu');
                    }                
                }
            } else if (!target.closest('menu') && !target.closest('.menu')) {
                menu.classList.remove('active-menu');
            } if (target.closest('.menu')) {
                menu.classList.toggle('active-menu');
            }
           
        });

    };

    toggleMenu();

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

    } 

    togglePopup();


    //scrollTo

    const scrollToAnimate = () => {

        let linkNav = document.querySelectorAll('[href^="#"]'),
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

    scrollToAnimate();


    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'), //кнопки табов
            tabContent = document.querySelectorAll('.service-tab'); //блоки с контентом

            //перебираем все табы, находить соответствующий и его показывать, остальные скрывать классом d-none
            const toggleTabContent = (index) => {
                for(let i=0; i<tabContent.length; i++) {
                    if(index === i){
                        tab[i].classList.add('active');
                        tabContent[i].classList.remove('d-none');
                    } else {
                        tab[i].classList.remove('active');
                        tabContent[i].classList.add('d-none');
                    }
                }
            };

            tabHeader.addEventListener('click', (event) => {
                //1ЫЙ ВАРИАНТ
                //let target = event.target; //получаем элемент, на который кликнули

                // while(target !== tabHeader) {
                //     //проверка, что кликнули по табу:
                //     if(target.classList.contains('service-header-tab')){
                //         //проверяем на какой таб кликнули, находим один из всех
                //         tab.forEach((item,i) => {
                //             if(item === target){
                //                 //console.log(tabContent[i]); //в консоли показываем соответсвующий блок с контентом
                //                 toggleTabContent(i);
                //             }
                //         });
                //         return;
                //     }
                //     target = target.parentNode;
                // }

               //2-ОЙ ВАРИАНТ 
                let target = event.target; 
                target = target.closest('.service-header-tab'); //если у элемента нет этого класса, поднимается выше к его родителю, проверяет, есть ли там этот класс, если и там нет, то поднимается дальше и т.д. Если не нешел, то вернет null. Поднимается только вверх.
                
                if(target){                    
                    tab.forEach((item,i) => {
                        if(item === target){                            
                            toggleTabContent(i);
                        }
                    });
                }
                
            });

    };

    tabs();

    

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
    }

    changeImg();

    //валидация
    const validator = () => {
        const input = document.querySelectorAll('.calc-block input');
        input.forEach((elem) => {
            elem.setAttribute('type', 'text');
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/\D/g, '');
            });
        });
        
    }

    validator();

    

});