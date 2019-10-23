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
    times,
    expenses1,
    expenses2;

let start = function() {   
    do {
        money = prompt('Ваш месячный доход, руб?', 40000);
    } while (isNaN(money) || money === '' || money === null);
};

start();

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период, через запятую', 'машина, квартира, дача');
addExpenses = addExpenses.toLowerCase().split(', ');

deposit = confirm('Есть ли у вас депозит в банке?');

console.log('money', typeof money);
console.log('addExpenses', typeof addExpenses);
console.log('deposit', typeof deposit);

let showTypeof = function(data) {
    console.log(data, typeof(data));
};

showTypeof(money);
showTypeof(deposit);
showTypeof(addExpenses);


if (money !== null && quest2 !== null && request2 !== null) {
    budgetMonth = money - quest2 - request2;
    //console.log('Доход за месяц: ', budgetMonth);
}


//Функция возвращает сумму всех расходов за месяц:

const getExpensesMonth = function() {
    let sum = 0,  //сумма расходов
        cost = 0; //статья расхода
    for(let i = 0; i < 2; i++) {
        if(i===0) {
            expenses1 = prompt('Введите обязательную статью расходов','Квартплата');
        }
        if(i===1) {
            expenses2 = prompt('Введите обязательную статью расходов','Бензин');
        }
        cost = +prompt('Сколько на это потребуется?',1000);
        while(isNaN(cost) || cost === '' || cost === null)  {
            cost = +prompt('Сколько на это потребуется?*',1000);            
        }        
        sum += cost;
    }     
    return sum;    
}

let expensesAmount = getExpensesMonth();

//Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = function(budget,expenses) {
    return budget - expenses;
}
let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);
console.log('Накопления за месяц - ', accumulatedMonth);


let getTargetMonth = function() {
    mission = +prompt('Сколько хотите накопить, руб?', 150000);
    times = Math.ceil(mission / accumulatedMonth);
    if( times < 0 ) {
        return times = 'Цель не будет достигнута';
    }
    return times;
}
let targetMonth = getTargetMonth();
console.log(targetMonth);


budgetDay = Math.ceil(accumulatedMonth/30);
console.log('Ваш дневной бюджет: ', budgetDay);


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


