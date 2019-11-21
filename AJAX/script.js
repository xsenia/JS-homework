document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    const select = document.getElementById('cars'),
          output = document.getElementById('output');

          select.addEventListener('change', () => {
                  const request = new XMLHttpRequest();
      
                  request.open('GET', './cars.json', true); //настроить ajax запрос. Первый параметр - метод отправки сообщения GET, Post. Второй - URL -  куда будет отправлен запрос, это может  быть локальный адрес. Третий -  asinc = true  по умолчанию.
                  
                  request.setRequestHeader('Content-type', 'application/json'); //мы осуществляем http запрос, а он состоит из заголовка и боди. Тут устнавливается заголовок. Первый парам - имя, второй - его значение

                  request.send(); //метод открывает соединение и отправляет запрос. и параметром передает данные на сервер
                  
                  request.addEventListener('readystatechange', () => { 
                        if (request.readyState === 4 && request.status === 200) {
                              const data = JSON.parse(request.responseText);

                              data.cars.array.forEach( item => {
                                    if(item.brand === select.value) {
                                          console.log('item: ', item);
                                          const {brand, model, price} = item;
                                          output.innerHTML = `${brand} ${model} ${price}`;
                                    }
                              });
                        }  else {
                              output.innerHTML = 'Ошибка';
                        }                      
                  });
          })
    
    
          
});