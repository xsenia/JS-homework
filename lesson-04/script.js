'use strict';

let money,
    addExpenses,
    deposit,
    quest1,
    request1,
    quest2,
    request2,
    budgetMonth,
    budgetDay,
    mission,
    times;

//---(1)---
money = +prompt('Ваш месячный доход, руб?', 40000);
console.log(typeof money);

//---(2)---
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период, через запятую', 'машина, квартира, дача');
addExpenses = addExpenses.toLowerCase().split(', ');
//console.log('addExpenses: ', addExpenses);

//---(3)---
deposit = confirm('Есть ли у вас депозит в банке?');

//---(4)---
console.log('money', typeof money);
console.log('addExpenses', typeof addExpenses);
console.log('deposit', typeof deposit);

let showTypeof = function(data) {
    console.log(data, typeof(data));
};

showTypeof(money);
showTypeof(deposit);
showTypeof(addExpenses);

//---(5)---

quest1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Аренда');
//console.log('Какие обязательные ежемесячные расходы у вас есть: ', quest1);


if (quest1 !== null) {
    request1 = prompt('Какие обязательные ежемесячные расходы у вас есть?', 'Квартплата');
    //console.log('Какие обязательные ежемесячные расходы у вас есть, второй раз: ', request1);
}

quest2 = +prompt('Во сколько это обойдется, руб?', 5000);
//console.log('Во сколько это обойдется: ', quest2);

if (quest2 !== null) {
    request2 = +prompt('Во сколько это обойдется, руб?', 10000);
    //console.log('Во сколько это обойдется, второй раз: ', request2);
}

//---(6)---

if (money !== null && quest2 !== null && request2 !== null) {
    budgetMonth = money - quest2 - request2;
    //console.log('Доход за месяц: ', budgetMonth);
}

//---(7)---

mission = +prompt('Сколько хотите накопить, руб?', 150000);
times = Math.ceil(mission / budgetMonth);
console.log('Такую сумму - ' + mission + 'руб - вы накопите за ' + times + ' месяцев');

//---(8)---

budgetDay = Math.ceil(budgetMonth/30);
console.log('Ваш дневной бюджет: ', budgetDay);

//---(9)---

let getStatusIncome = function() {
    if (budgetDay > 800) {
        console.log('Высокий уровень дохода');
    } else if (budgetDay > 300 && budgetDay <=800) {
        console.log('Средний уровень дохода');
    } else if (budgetDay > 0 && budgetDay <= 300) {
        console.log('Низкий уровень дохода');
    } else {
        console.log('Что то пошло не так');
    }
};

getStatusIncome();


//Функция возвращает сумму всех расходов за месяц:

const getExpensesMonth = function(expenses1,expenses2) {
    return expenses1 + expenses2;
}
let expensesMonth = getExpensesMonth(quest2, request2);
//console.log('Сумма всех расходов за месяц - ', expensesMonth);

//Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = function(budget,expenses) {
    return budget - expenses;
}
let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);
console.log('Накопления за месяц - ', accumulatedMonth);


