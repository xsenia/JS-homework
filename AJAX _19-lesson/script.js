document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    const select = document.getElementById('cars'),
          output = document.getElementById('output');

          select.addEventListener('change', () => {
              fetch('./cars.json', {
                    method: 'GET',
                    mode: 'same-origin',
                    cache: 'default',
                    credentials: 'same-origin',
                    headers: {
                          'Content-Type': 'application/json'
                    },
                    redirect: 'follow',
                    referrer: 'client',
                    body: JSON.stringify(data)
              })
              .then((response)=>{
                    if (response.status !== 200) {
                        throw new Error('Статус не 200');
                    }
                    return(response.json()); //response.text() или так; 
                                             //получили промис, обратоли его в следующем .then
              })
              .then((response)=>{
                  let data = response;
                  data.cars.forEach( item => {
                        if(item.brand === select.value) {
                              const {brand, model, price} = item;
                              output.innerHTML = `${brand} ${model} ${price}`;
                        }
                  });
              })
              .catch((error)=>console.error(error));   
          })


            // const request = new XMLHttpRequest();
      
            // request.open('GET', './cars.json', true); 

            // request.setRequestHeader('Content-type', 'application/json');

            // request.send();

            // request.addEventListener('readystatechange', () => { 
            //       if (request.readyState === 4 && request.status === 200) {
            //             const data = JSON.parse(request.responseText);

            //             data.cars.forEach( item => {
            //                   if(item.brand === select.value) {
            //                         const {brand, model, price} = item;
            //                         output.innerHTML = `${brand} ${model} ${price}`;
            //                   }
            //             });
            //       }  else {
            //             output.innerHTML = 'Ошибка';
            //       }                      
            // });
    
    
          
});