'use strict';

let money;
const start = function() {   
    do {
        money = prompt('Ваш месячный доход, руб?', 40000);
    } while (isNaN(money) || money === '' || money === null);
};

start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budgetDay: 0, 
    budgetMonth: 0, 
    expensesMonth: 0,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период, через запятую', 'машина, квартира, дача');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for(let i = 0; i < 2; i++) {
            let requiredExpenses = prompt('Введите обязательную статью расходов', 'трата №' + (i+1));
            let requiredAnswer;
            do{
                requiredAnswer = prompt('Во сколько это обойдется?',1000); 
            } while (isNaN(requiredAnswer) || requiredAnswer === '' || requiredAnswer === null);            

            appData.expenses[requiredExpenses] = requiredAnswer;
        }
        
        console.log('appData.expenses: ', appData.expenses);

    },
    getExpensesMonth: function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }    
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth/30);
    },
    getTargetMonth: function() {    
        return appData.mission/appData.getAccumulatedMonth;
    },
    getStatusIncome: function () {
        if (appData.budgetDay > 800) {
            return('Высокий уровень дохода');
        } else if (appData.budgetDay > 300 && appData.budgetDay <=800) {
            return('Средний уровень дохода');
        } else if (appData.budgetDay > 0 && appData.budgetDay <= 300) {
            return('Низкий уровень дохода');
        } else {
            return('Что то пошло не так');
        }
    }
}


appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ', appData.expensesMonth);


if(appData.getTargetMonth()>0){
    console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
} else {
    console.log('Цель не будет достигнута');
}

//выведет уровень дохода
console.log(appData.getStatusIncome());

for(let key in appData) {
    console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
}


