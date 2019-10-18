let num = 266219,
    symbols,
    number,
    result = 1;

symbols = num.toString();                        //привели к строке
symbols = symbols.split('');                     //разбили строку на массив

for (let i=0; i<symbols.length; i++){
    number = Number(symbols[i]);                 //привели к числу
    result = result * number;
}

console.log('Результат: ', result);              // результат

result = result**3;                              // возведение в степень 3 - основание**степень
console.log('Результат в степени: ', result);


let sliceStr = result.toString();
sliceStr = sliceStr.slice(0,2);
console.log('Первые два числа: ', sliceStr);
