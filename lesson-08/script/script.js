'use strict';

let btnStart =                  document.getElementById('start'),
    salaryAmount =              document.querySelector('.salary-amount'),
    incomeTitle =               document.querySelector('.income-title'),
    incomeAmount =              document.querySelector('.income-amount'),
    additionalIncomeItems =     document.querySelectorAll('.additional_income-item'),
    additionalIncomeItem1 =     additionalIncomeItems[0],
    additionalIncomeItem2 =     additionalIncomeItems[1],
    arrPlus =                   document.querySelectorAll('.btn_plus'),
    incomePlus =                arrPlus[0],
    expensesPlus =              arrPlus[1],
    expensesItems =             document.querySelectorAll('.expenses-items'),    
    additionalIncomeTitle =     document.querySelector('.additional_income-title'),
    additionalIncomeItem =      document.querySelectorAll('.additional_income-item'),
    expensesTitle =             document.querySelector('.expenses-title'),
    expensesAmount =            document.querySelector('.expenses-amount'),
    additionalExpensesItemd =   document.querySelector('.additional_expenses-item'),
    depositCheck =              document.querySelector('#deposit-check'),
    depositAmount =             document.querySelector('.deposit-amount'),
    depositPercent =            document.querySelector('.deposit-percent'),
    targetAmount =              document.querySelector('.target-amount'),
    periodSelect =              document.querySelector('.period-select'),
    budgetMonthValue =          document.querySelector('.budget_month-value'),
    budgetDayValue =            document.querySelector('.budget_day-value'),
    expensesMonthValue =        document.querySelector('.expenses_month-value'),
    additionalIncomeValue =     document.querySelector('.additional_income-value'),
    additionalExpensesValue =   document.querySelector('.additional_expenses-value'),
    incomePeriodValue =         document.querySelector('.income_period-value'),
    targetMonthValue =          document.querySelector('.target_month-value');

   
    let appData = {
        budget: 0,
        income: {},
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposite: false,
        persentDeposite: 0,
        moneyDeposite: 0,
        mission: 50000,
        period: 3,
        budgetDay: 0, 
        budgetMonth: 0, 
        expensesMonth: 0,
        start: function() { 
            
            if(salaryAmount.value === null ) { 
               alert('заполните поле');
               return;
            }

            appData.budget = salaryAmount.value;
            console.log('salaryAmount.value: ', salaryAmount.value);
            

            // appData.asking();
            // appData.getExpensesMonth();
            // appData.getBudget();
        },
        addExpensesBlock: function() {        
            let cloneExpensesItems = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
    
            if (expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            }
        },
        asking: function() {
            if (confirm('Есть ли у вас дополнительный источник заработка?')) {
                let itemIncome;
                do{
                    itemIncome = prompt('Какой у вас дополнительный заработок?','Таксую'); 
                } while (itemIncome === null || itemIncome.length === 0 || !isNaN(itemIncome));
    
                let cachIncome;
                do{
                    cachIncome = prompt('Сколько вы на этом зарабатываете?',10000); 
                } while (isNaN(cachIncome) || cachIncome === '' || cachIncome === null);
    
                appData.income[itemIncome] = cachIncome;
            }
    
            let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период, через запятую', 'машина, квартира, дача');
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposite = confirm('Есть ли у вас депозит в банке?');
    
            for(let i = 0; i < 2; i++) {
                let requiredExpenses = prompt('Введите обязательную статью расходов', 'трата №' + (i+1));
                let requiredAnswer;
                do{
                    requiredAnswer = prompt('Во сколько это обойдется?',1000); 
                } while (isNaN(requiredAnswer) || requiredAnswer === '' || requiredAnswer === null);            
    
                appData.expenses[requiredExpenses] = requiredAnswer;
            }
            
            //console.log('appData.expenses: ', appData.expenses);
    
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
        },
        getInfoDeposite: function() {
            
            if(appData.deposite){            
                do{
                    appData.persentDeposite = prompt('Какой годовой процент?', 10);
                } while (appData.persentDeposite === null || appData.persentDeposite.length === 0 || isNaN(appData.persentDeposite));
    
                do{
                    appData.moneyDeposite = prompt('Какая сумма заложена?', 10000)
                } while (isNaN(appData.moneyDeposite) || appData.moneyDeposite === '' || appData.moneyDeposite === null);            
            }
        },
        calcSavedMoney: function() {
            return appData.budgetMonth * appData.period;
        }
    };

    start.addEventListener('click', () => {
        appData.start();
    });
    
    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    
    
    
    //console.log('Расходы за месяц: ', appData.expensesMonth);
    
    
    if(appData.getTargetMonth()>0){
        console.log('Цель будет достигнута за ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
    } else {
        console.log('Цель не будет достигнута');
    }
    
    //выведет уровень дохода
    //console.log(appData.getStatusIncome());
    
    for(let key in appData) {
        //console.log('Наша программа включает в себя данные: ' + key + ' - ' + appData[key]);
    }
    
    appData.getInfoDeposite();
    
    let addExpensesString = '';
    for (let i=0; i<appData.addExpenses.length; i++) {
        let newAddExpenses = appData.addExpenses[i].trim(); 
        newAddExpenses = newAddExpenses[0].toUpperCase() + newAddExpenses.slice(1); 
        addExpensesString += newAddExpenses + ', ';    
    }
    
    //console.log('addExpensesString: ', addExpensesString);