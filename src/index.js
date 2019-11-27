'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import scrollToAnimate from './modules/scrollToAnimate';
import tabs from './modules/tabs';
import changeImg from './modules/changeImg';
import validator from './modules/validator';
import phoneValidator from './modules/phoneValidator';
import textValidator from './modules/textValidator';
import slider from './modules/slider';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
  
setInterval(countTimer, 1000, '19 december 2019');

toggleMenu();

togglePopup();

scrollToAnimate();

tabs();

changeImg();

validator();

phoneValidator();

textValidator();   

slider();   

calc(100);

sendForm('form1');
sendForm('form2');
sendForm('form3'); 