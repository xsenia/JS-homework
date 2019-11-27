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

export default tabs;