let money = 1000,                          
    income = 'фриланс',                        
    addExpenses = 'школа, машина, питомцы', 
    deposit = true,                          
    mission = 150000,                        
    period = 6;


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(income.length);
console.log("Период " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");

budgetDay = money/30;
console.log('budgetDay: ', budgetDay);
console.log('остаток от деления: ', money % 30);
modulo = (money % 30) > 0 ? "Да, остаток есть" : "Нет, остатка нет";
console.log('modulo: ', modulo);

let str = addExpenses.toLowerCase();
console.log('Нижний регистр: ', str);
str = str.split(', ');
console.log('Массив из строки: ', str);


