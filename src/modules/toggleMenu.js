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

export default toggleMenu;