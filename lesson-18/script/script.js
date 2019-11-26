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
    validator();

    //Валидатор ввода телефона

    const phoneValidator = () => {
        const input = document.querySelectorAll('.form-phone');
        input.forEach((elem) => {
            elem.addEventListener('input', () => {
                elem.value = elem.value.replace(/[^0-9+]/, '');
            });
        });        
    };
    phoneValidator();

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
    textValidator();

    //slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content');       


        let currentSlide = 0,
            interval;

        //добавляю точки
        let dot = [];
        let portfolioDots = document.createElement('ul');
        
        portfolioDots.classList.add('portfolio-dots');
        slider.append(portfolioDots);
        
        for(let i=0; i<slide.length; i++) {
            let dotOne = document.createElement('li');
            dotOne.classList.add('dot');
            dot[i] = dotOne;
            portfolioDots.append(dotOne);
        }
        dot[currentSlide].classList.add('dot-active');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            currentSlide++;
            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            if(!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if(currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(3000);



    };

    slider();

    //calculator
    const calc = (price = 100) => {
        const caclBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,  //value выбранного селекта           
                squareValue = +calcSquare.value;
                // console.log('squareValue: ', !!squareValue); - так выведет true / false
                // console.log('typeValue: ', !!typeValue);
            
            if (calcCount.value > 1 ) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }


            totalValue.textContent = total;
        };

        caclBlock.addEventListener('change', (event) => {
            const target = event.target;
            // if (target.matches('.calc-type') || target.matches('.calc-square') || target.matches('.calc-day') || target.matches('.calc-count')) {
            //     console.log('test');
            // }
            if (target === calcType || target === calcSquare || target === calcDay || target === calcCount ) {
               countSum();
            }

        });


    };

    calc(100);

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
            .then(() => {
                statusMessage.textContent = successMessage;
                }, 
                (error) => {                
                    statusMessage.textContent = errorMessage;
                    console.log(error);
                }
            );

            resetForm(formId);

        });
        

        const postData = (body) => {
            return new Promise((resolve, reject) => {
                const request = new XMLHttpRequest();

                request.addEventListener('readystatechange', () => {  
                    if(request.readyState !== 4) {
                        return;                }
        
                    if(request.status === 200) {
                        resolve();                    
                    } else {
                        reject(request.status);                    
                    }
                });

                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'application/json');                

                request.send(JSON.stringify(body));

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

    sendForm('form1');
    sendForm('form2');
    sendForm('form3');


    

    

});