'use strict';

const number = [54, -20, 80, -35, 32, 29, -15];
const names = ['vladiMir', 'Mark', 'Logan'];
const mix = ['Glo', 25, true, 'Academy', '15', -2, null];
const badNum = [ 45, 20, 74, -35, 'hi', 32, 29, 5];


/*******reduce******** */

let sum = 0;
for (let i = 0; i < number.length; i++) {
    sum += number[i];
}
console.log('sum',sum);

//or

//accumulator - параметр, накапливает в себе результат предыдущих итераций
let sum2 = number.reduce(function(accumulator, item) {
    console.table({accumulator,item});
    return accumulator + item;
}, 0);

// 0 - это точка отправления для метода reduce, может быть и любым другим числом и т.п.

console.log('sum2',sum2);


const arr = [[1, 2], [3, 4], [5, 6]];
const res = arr.reduce((arr, item) => arr.concat(item), []);
console.log('res: ', res);


/**********есть ли в массиве что-то, удовлетворяющее условию*********** */

let result = false;

for (let i = 0; i < mix.length; i++) {
    if(typeof mix[i] === 'number') {  
        result = true;
        break;
    }
}

console.log('result: ', result);

//то же самое:

let result2 = mix.some(function(item) {    
    return typeof item === 'number';
});

console.log('result2: ', result2);


//every проверяет каждый элемент

let result3 = badNum.every(function(item) {    
    return typeof item === 'number';
});

console.log('result3: ', result3);

/**********filter*********** */
/* фильтруем элементы, по какому условию -  typeof item === 'string' - если условие вернет true, то элемент будет записан в новый массив filterWord, если false, то переход к следующей итерации */

let filterWord = mix.filter((item) => {    
    return typeof item === 'string';
})

console.log('filterWord: ', filterWord);

let positiveNumbers = number.filter((item) => {    
    return  item < 0;
})

console.log('positiveNumbers: ', positiveNumbers);


/**********взять только строки*********** */

let forWord = [];

//isNaN(mix[i]) - уберет строку, которую можно привести к числу

for (let i = 0; i < mix.length; i++) {
    if(typeof mix[i] === 'string' && isNaN(mix[i])) {  
        forWord.push(mix[i]);
    }
}

console.log('forWord: ', forWord);

/****************** */

const correctName = names.map(function(item) {  
    return item[0].toUpperCase() + item.slice(1).toLowerCase();
});

const correctNameNew = names.map((item) => item[0].toUpperCase() + item.slice(1).toLowerCase());

console.log('names: ', names);
console.log('correctName: ', correctName);
console.log('correctNameNew: ', correctNameNew);

/********************* */

for (let i = 0; i < names.length; i++) {
    names[i] = names[i][0].toUpperCase() + names[i].slice(1).toLowerCase();
}

names.forEach((item, i, arr) => {
    arr[i] = item[0].toUpperCase() + item.slice(1).toLowerCase();
})

//********************* */


for (let i = 0; i < mix.length; i++) {
    console.log(mix[i]);
}

for (let index in mix) {
    console.log(mix[index]);
}

for (let elem of mix) {
    console.log(elem);
}

mix.forEach(function(item, index, arr) {
    console.log(this);
}, number)

mix.forEach(function(item, index, arr) {
    console.table({item, index, arr});
})

mix.forEach((item) => {
    console.log(item);
})