'use strict';

let btnStart =                  document.getElementById('start'),
    btnCancel =                  document.getElementById('cancel'),
    salaryAmount =              document.querySelector('.salary-amount'),
    incomeTitle =               document.querySelector('.income-title'),
    additionalIncomeItems =     document.querySelectorAll('.additional_income-item'),
    additionalIncomeItem1 =     additionalIncomeItems[0],
    additionalIncomeItem2 =     additionalIncomeItems[1],
    arrPlus =                   document.getElementsByTagName('button'),
    incomePlus =                arrPlus[0],
    expensesPlus =              arrPlus[1],
    expensesItems =             document.querySelectorAll('.expenses-items'),    
    additionalIncomeTitle =     document.querySelector('.additional_income-title'),
    additionalIncomeItem =      document.querySelectorAll('.additional_income-item'),
    expensesTitle =             document.querySelector('.expenses-title'),
    expensesAmount =            document.querySelector('.expenses-amount'),
    additionalExpensesItem =    document.querySelector('.additional_expenses-item'),
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
        } else if(salaryAmount.value === '') {
            btnStart.setAttribute('disabled', true);
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
            
            let dataInputs = document.querySelectorAll('.data input[type=text]');      
            dataInputs.forEach(function(item){
                item.setAttribute('disabled', true);
            });

            incomePlus.setAttribute('disabled', true);
            expensesPlus.setAttribute('disabled', true);

            btnStart.style.display = 'none';
            btnCancel.style.display = 'block';

            this.budget = +salaryAmount.value;

            
            this.getExpenses();
            this.getIncome();

            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getBudget();
            this.showResult();
        },
        reset: function() {
            btnStart.setAttribute('disabled',true);

            let dataInputs = document.querySelectorAll('.data input[type = text]'),
                resultInputs = document.querySelectorAll('.result input[type = text]');
    
            dataInputs.forEach(function(item){
                item.value = '';            
                item.removeAttribute('disabled');           
            });
            resultInputs.forEach(function(item){
                item.value = '';            
            });

            incomePlus.removeAttribute('disabled');
            expensesPlus.removeAttribute('disabled');            
               
            periodSelect.value = 1;
            periodAmount.innerHTML = 1;
    
            for(let i=1; i<incomeItems.length; i++) {
                incomeItems[i].parentNode.removeChild(incomeItems[i]);
                incomePlus.style.display = 'block';
            }
            for(let i=1; i<expensesItems.length; i++) {
                expensesItems[i].parentNode.removeChild(expensesItems[i]);
                expensesPlus.style.display = 'block';
            }
    
            this.budget = 0;
            this.income = {};
            this.incomeMonth = 0; 
            this.addIncome = []; 
            this.question1 = 0; 
            this.question2 = 0;
            this.expenses = {};
            this.addExpenses = [];
            this.deposit = false;
            this.persentDeposite = 0;
            this.moneyDeposite = 0;
            this.budgetDay = 0; 
            this.budgetMonth = 0; 
            this.expensesMonth = 0;
    
            btnCancel.style.display = 'none';
            btnStart.style.display = 'block';
        },
        showResult: function() {
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = this.budgetDay;
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(this.getTargetMonth());
            incomePeriodValue.value = this.calcPeriod();
        },        
        addExpensesBlock: function() {        
            let cloneExpensesItems = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
    
            if (expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            }

            cloneExpensesItems.querySelectorAll('input').forEach((item)=>{
                item.value = '';
            });

            appData.inputValidation();
        },
        addIncomeBlock: function() {        
            let cloneIncomeItems = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
    
            if (incomeItems.length === 3) {
                incomePlus.style.display = 'none';
            }

            cloneIncomeItems.querySelectorAll('input').forEach((item)=>{
                item.value = '';
            });

            appData.inputValidation();
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
            for (let key in this.income) {
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
            for (let key in this.expenses) {
                this.expensesMonth += +this.expenses[key];
            }    
        },
        getBudget: function() {
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
            this.budgetDay = Math.ceil(this.budgetMonth/30);
        },
        getTargetMonth: function() {    
            return targetAmount.value/this.budgetMonth;
        },        
        calcPeriod: function() {
            return this.budgetMonth * this.setPeriod();
        },
       inputValidation: function(){
            let inputs = document.querySelectorAll('input');
            inputs.forEach((item)=>{
                let placeholder = item.getAttribute('placeholder');
                
                if(placeholder === 'Наименование') {
                    console.log('Наименование: ', placeholder);
                    item.addEventListener('input', () => {
                        item.value = item.value.replace(/\w/g, '');
                    });
                } else if (placeholder === 'Сумма') {
                    console.log('Сумма: ', placeholder);
                    item.addEventListener('input', () => {
                        item.value = item.value.replace(/\D/g, '');
                    });
                }
            });
        }

    };

    start.addEventListener('click', appData.start.bind(appData));
    btnCancel.addEventListener('click', appData.reset.bind(appData));

    appData.inputValidation();
    
    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);
    
    periodSelect.addEventListener('change', appData.setPeriod);     
    