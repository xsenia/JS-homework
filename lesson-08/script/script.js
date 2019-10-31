'use strict';

let btnStart =                  document.getElementById('start'),
    btnCncel =                  document.getElementById('cancel'),
    salaryAmount =              document.querySelector('.salary-amount'),
    incomeTitle =               document.querySelector('.income-title'),
    //incomeAmount =              document.querySelector('.income-amount'),
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
    additionalExpensesItem =   document.querySelector('.additional_expenses-item'),
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
    targetMonthValue =          document.querySelector('.target_month-value'),
    periodAmount =              document.querySelector('.period-amount'),
    incomeItems =               document.querySelectorAll('.income-items'),
    dataInputs =                document.querySelectorAll('.data input[type=text]');

    btnStart.setAttribute('disabled',true);
    salaryAmount.addEventListener('input', function(){
        if(salaryAmount.value !== '' && !isNaN(salaryAmount.value)) {
            btnStart.removeAttribute('disabled');
        }
    });
   
    let appData = {
        budget: 0,
        income: {},
        incomeMonth: 0,
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposite: false,
        persentDeposite: 0,
        moneyDeposite: 0,
        mission: 50000,
        budgetDay: 0, 
        budgetMonth: 0, 
        expensesMonth: 0,
        start: function() {   
            //debugger;         

            appData.budget = +salaryAmount.value;

            appData.getExpenses();
            appData.getIncome();
            console.log('appData.getIncome: ', appData.getIncome);

            appData.getExpensesMonth();
            appData.getAddExpenses();
            appData.getBudget();
            appData.showResult();
        },
        showResult: function() {
            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = appData.budgetDay;
            expensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(appData.getTargetMonth());
            incomePeriodValue.value = appData.calcPeriod();
        },
        getResult: function() {        
            dataInputs.forEach(function(item){
                item.setAttribute('disabled', true);
            });
            btnStart.style.display = 'none';
            btnCncel.style.display = 'block';
    
        },
        addExpensesBlock: function() {        
            let cloneExpensesItems = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
    
            if (expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            }
        },
        addIncomeBlock: function() {        
            let cloneIncomeItems = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
    
            if (incomeItems.length === 3) {
                incomePlus.style.display = 'none';
            }
        },
        getExpenses: function() {
            expensesItems.forEach(function(item){
                let itemExpanses = item.querySelector('.expenses-title').value;
                let cashExpanses = item.querySelector('.expenses-amount').value;
                if(itemExpanses !== '' && cashExpanses !== '') {
                    appData.expenses[itemExpanses] = cashExpanses;
                }
            });
        },
        getIncome: function () {
            incomeItems.forEach(function(item){
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== '') {
                    appData.income[itemIncome] = cashIncome;
                }            
            });
            for (let key in appData.income) {
               appData.incomeMonth += +appData.income[key];               
            }
        },
        getAddExpenses: function() {
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if (item !== '') {
                    appData.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function() {
            additionalIncomeItem.forEach(function(item){
                let itemValue = item.value.trim();
                if (itemValue !== '') {
                    appData.addIncome.push(itemValue);
                }
            });
        },
        setPeriod: function() {
            let periodValue = periodSelect.value;
            periodAmount.innerHTML = periodValue;
            incomePeriodValue.value = periodValue*appData.budgetMonth;
            return periodValue;
        },
        getExpensesMonth: function() {
            for (let key in appData.expenses) {
                appData.expensesMonth += +appData.expenses[key];
            }    
        },
        getBudget: function() {
            appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
            appData.budgetDay = Math.ceil(appData.budgetMonth/30);
        },
        getTargetMonth: function() {    
            return targetAmount.value/appData.budgetMonth;
        },
        
        calcPeriod: function() {
            return appData.budgetMonth * appData.setPeriod();
        }
    };

    start.addEventListener('click', () => {
        appData.start();
        appData.getResult();
    });
    
    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);
    
    periodSelect.addEventListener('change', appData.setPeriod);     
    