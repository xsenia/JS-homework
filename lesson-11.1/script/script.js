'use strict';

let btnStart =                  document.getElementById('start'),
    btnCancel =                 document.getElementById('cancel'),
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
    dataInputs =                document.querySelectorAll('.data input[type=text]'),
    depositBank =               document.querySelector('.deposit-bank');
    
    btnStart.setAttribute('disabled',true);
    salaryAmount.addEventListener('input', function(){
        if(salaryAmount.value !== '' && !isNaN(salaryAmount.value)) {
            btnStart.removeAttribute('disabled');
        } else if(salaryAmount.value === '') {
            btnStart.setAttribute('disabled', true);
        }        
    });

    const AppData = function () {
        this.budget = 0;
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.persentDeposit = 0;
        this.moneyDeposit = 0;
        this.mission = 50000;
        this.budgetDay = 0; 
        this.budgetMonth = 0; 
        this.expensesMonth = 0;        
    };

    AppData.prototype.start = function() {   
        //debugger; 
        
        let dataInputs = document.querySelectorAll('.data input[type=text]');      
        dataInputs.forEach(function(item){
            item.setAttribute('disabled', true);
        });

        incomePlus.setAttribute('disabled', true);
        expensesPlus.setAttribute('disabled', true);

        btnStart.style.display = 'none';
        btnCancel.style.display = 'block';
        periodSelect.setAttribute('disabled', true);
        depositBank.setAttribute('disabled',true);

        this.budget = +salaryAmount.value;
        
        this.getExpenses();
        this.getIncome();            
        this.getInfoDeposit();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.showResult();
    };

;
   AppData.prototype.reset = function() {
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
        periodSelect.removeAttribute('disabled');
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
    };

    AppData.prototype.showResult = function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
    };

    AppData.prototype.addBlock = function(btnPlus,items,classItems) { 
        let cloneItems = items[0].cloneNode(true);    
        items[0].parentNode.insertBefore(cloneItems, btnPlus);
        items = document.querySelectorAll(classItems);
    
        if (items.length === 3) { 
            btnPlus.style.display = 'none';
        }
        cloneItems.querySelectorAll('input').forEach((item)=>{
            item.value = '';
        });
        
        this.inputValidation();
    };

    // AppData.prototype.addExpensesBlock = function() {   
    //     const _this = this;     
    //     let cloneExpensesItems = expensesItems[0].cloneNode(true);
    //     expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesPlus);
    //     expensesItems = document.querySelectorAll('.expenses-items');

    //     if (expensesItems.length === 3) {
    //         expensesPlus.style.display = 'none';
    //     }

    //     cloneExpensesItems.querySelectorAll('input').forEach((item)=>{
    //         item.value = '';
    //     });

    //     _this.inputValidation();
    // };

    // AppData.prototype.addIncomeBlock = function() {  
    //     const _this = this;      
    //     let cloneIncomeItems = incomeItems[0].cloneNode(true);
    //     incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    //     incomeItems = document.querySelectorAll('.income-items');

    //     if (incomeItems.length === 3) {
    //         incomePlus.style.display = 'none';
    //     }

    //     cloneIncomeItems.querySelectorAll('input').forEach((item)=>{
    //         item.value = '';
    //     });

    //     _this.inputValidation();
    // };

    AppData.prototype.getExpenses = function() {        
        expensesItems.forEach((item) => {
            let itemExpanses = item.querySelector('.expenses-title').value;
            let cashExpanses = item.querySelector('.expenses-amount').value;
            if(itemExpanses !== '' && cashExpanses !== '') {
               this.expenses[itemExpanses] = cashExpanses;
            }
        });
    };

    AppData.prototype.getIncome = function () {        
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = cashIncome;
                console.log('cashIncome: ', cashIncome);
                console.log('this.income[itemIncome]: ', this.income[itemIncome]);
            }            
        });
        for (let key in this.income) {
            this.incomeMonth += +this.income[key];               
        }
    };    

    AppData.prototype.getAddExpenses = function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    };

    AppData.prototype.getAddIncome = function() {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    };

    AppData.prototype.setPeriod = function() {        
        let periodValue = periodSelect.value;
        periodAmount.innerHTML = periodValue;  
        return periodValue;
    };

    AppData.prototype.getExpensesMonth = function() {
        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }    
    };

    AppData.prototype.getBudget = function() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + (this.moneyDeposit*this.persentDeposit)/12;
        console.log('this.budgetMonth 11: ', this.budgetMonth);
        this.budgetDay = Math.ceil(this.budgetMonth/30);
    };

    AppData.prototype.getTargetMonth = function() {    
        return targetAmount.value/this.budgetMonth;
    };

    AppData.prototype.getInfoDeposit = function() {
        if(this.deposit){  
            this.persentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    };

    AppData.prototype.calcPeriod = function() {
        return this.budgetMonth * this.setPeriod();        
    };

    AppData.prototype.inputValidation = function(){
        let inputs = document.querySelectorAll('input');
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
    };


    AppData.prototype.eventListeners = function() {
        start.addEventListener('click', appData.start.bind(appData));
        btnCancel.addEventListener('click', appData.reset.bind(appData));

        appData.inputValidation();
        
        // expensesPlus.addEventListener('click', appData.addExpensesBlock);
        // incomePlus.addEventListener('click', appData.addIncomeBlock);

        expensesPlus.addEventListener('click', () => { 
            this.addBlock(expensesPlus,expensesItems,'.expenses-items')
        });
        incomePlus.addEventListener('click', () => { 
            this.addBlock(incomePlus,incomeItems,'.income-items')
        });
        
        periodSelect.addEventListener('change', appData.setPeriod);
    };


    const appData = new AppData();
    appData.eventListeners();

depositCheck.addEventListener('change', function() {
    if(depositCheck.checked) {
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        appData.deposit = true;
        console.log('appData.deposit: ', appData.deposit);

        depositBank.addEventListener('change', function() {
            let selectIndex = this.options[this.selectedIndex].value;
            console.log('selectIndex: ', selectIndex);
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
        console.log('appData.deposit: ', appData.deposit);
    }
});
   
    

         
    