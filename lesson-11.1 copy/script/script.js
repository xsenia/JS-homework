'use strict';

const btnStart =                document.getElementById('start'),
    btnCancel =                 document.getElementById('cancel'),
    salaryAmount =              document.querySelector('.salary-amount'),
    incomeTitle =               document.querySelector('.income-title'),
    arrPlus =                   document.getElementsByTagName('button'),
    incomePlus =                arrPlus[0],
    expensesPlus =              arrPlus[1],       
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
    dataInputs =                document.querySelectorAll('.data input[type=text]'),
    depositBank =               document.querySelector('.deposit-bank');

let expensesItems =             document.querySelectorAll('.expenses-items'), 
    incomeItems =               document.querySelectorAll('.income-items');
    
    btnStart.setAttribute('disabled',true);
    salaryAmount.addEventListener('input', function(){
        if(salaryAmount.value !== '' && !isNaN(salaryAmount.value)) {
            btnStart.removeAttribute('disabled');
        } else if(salaryAmount.value === '') {
            btnStart.setAttribute('disabled', true);
        }        
    });    

    class AppData {
        constructor (
            budget = 0,
            income = {},
            incomeMonth = 0,
            addIncome = [],
            expenses = {},
            addExpenses = [],
            deposit = false,
            persentDeposit = 0,
            moneyDeposit = 0,
            mission = 50000,
            budgetDay = 0,
            budgetMonth = 0,
            expensesMonth = 0
        ) {
            this.budget = budget;
            this.income = income;
            this.incomeMonth = incomeMonth;
            this.addIncome = addIncome;
            this.expenses = expenses;
            this.addExpenses = addExpenses;
            this.deposit = deposit;
            this.persentDeposit = persentDeposit;
            this.moneyDeposit = moneyDeposit;
            this.mission = mission;
            this.budgetDay = budgetDay; 
            this.budgetMonth = budgetMonth; 
            this.expensesMonth = expensesMonth; 
        }
    

    start = function() {
        
        const dataInputs = document.querySelectorAll('.data input[type=text]');      
        dataInputs.forEach(function(item){
            item.setAttribute('disabled', true);
        });

        incomePlus.setAttribute('disabled', true);
        expensesPlus.setAttribute('disabled', true);

        btnStart.style.display = 'none';
        btnCancel.style.display = 'block';
        depositBank.setAttribute('disabled',true);

        this.budget = +salaryAmount.value;        
         
        this.getExpInc();          
        this.getInfoDeposit();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
    }


   reset = function() {
        btnStart.setAttribute('disabled',true);

        const dataInputs = document.querySelectorAll('.data input[type = text]'),
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
        depositBank.removeAttribute('disabled'); 
        
        depositPercent.style.display = 'none';
        depositPercent.value = '';
        depositAmount.style.display = 'none';
        depositAmount.value = '';
        depositBank.style.display = 'none';
        depositCheck.checked = false;        
           
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
        this.persentDeposit = 0;
        this.moneyDeposit = 0;
        this.budgetDay = 0; 
        this.budgetMonth = 0; 
        this.expensesMonth = 0;

        btnCancel.style.display = 'none';
        btnStart.style.display = 'block';
    }

    showResult = function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
    }   

    addBlock = function(btnPlus,items,classItems) {
        const cloneItems = items[0].cloneNode(true);    
        items[0].parentNode.insertBefore(cloneItems, btnPlus);
        items = document.querySelectorAll(classItems);
    
        if (items.length === 3) { 
            btnPlus.style.display = 'none';
        }
        cloneItems.querySelectorAll('input').forEach((item)=>{
            item.value = '';
        });

        expensesItems =             document.querySelectorAll('.expenses-items');      
        incomeItems =               document.querySelectorAll('.income-items');
        
        this.inputValidation();
    }  

    getExpInc = function () {

        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if(itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }            
        }

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
            console.log('this.incomeMonth: ', this.incomeMonth);
        }
    }

    getAddIncome = function() {
        additionalIncomeItem.forEach((item) => {            
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    getAddExpenses = function() {
        const addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }

    setPeriod = function() {        
        const periodValue = periodSelect.value;
        periodAmount.innerHTML = periodValue;  
        return periodValue;
    }

    getExpensesMonth = function() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }    
    }

    getBudget = function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit*this.persentDeposit)/12;
        this.budgetDay = Math.ceil(this.budgetMonth/30);
    }

    getTargetMonth = function() {    
        return targetAmount.value/this.budgetMonth;
    }

    getInfoDeposit = function() {
        if(this.deposit){  
            this.persentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    calcPeriod = function() {
        return this.budgetMonth * this.setPeriod();        
    }

    inputValidation = function(){
        const inputs = document.querySelectorAll('input');
        inputs.forEach((item)=>{
            let placeholder = item.getAttribute('placeholder');
            
            if(placeholder === 'Наименование') {
                item.addEventListener('input', () => {
                    item.value = item.value.replace(/\w/g, '');
                });
            } else if (placeholder === 'Сумма') {
                item.addEventListener('input', () => {
                    item.value = item.value.replace(/\D/g, '');
                });
            }
        });
    }

    calcIncome = function () {
        incomePeriodValue.value = this.calcPeriod();
    }


    eventListeners = function() {
        start.addEventListener('click', this.start.bind(appData));
        btnCancel.addEventListener('click', this.reset.bind(appData));

        this.inputValidation();        

        expensesPlus.addEventListener('click', () => { 
            this.addBlock(expensesPlus,expensesItems,'.expenses-items')
        });
        incomePlus.addEventListener('click', () => { 
            this.addBlock(incomePlus,incomeItems,'.income-items')
        });        
        
        periodSelect.addEventListener('change', appData.setPeriod);
        periodSelect.addEventListener('change', this.calcIncome.bind(appData));
    }

}


    const appData = new AppData();
    appData.eventListeners();

depositCheck.addEventListener('change', function() {
    if(depositCheck.checked) {
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        appData.deposit = true;

        depositBank.addEventListener('change', function() {
            const selectIndex = this.options[this.selectedIndex].value;
            if (selectIndex == 'other') {
                depositPercent.style.display = 'inline-block';
                depositPercent.value = '';
            } else {
                depositPercent.style.display = 'none';
                depositPercent.value = selectIndex;
            }
        });
    } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositAmount.value = '';        
        appData.deposit = false;
    }
});
   
    

         
    