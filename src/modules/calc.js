//calculator
const calc = (price = 100) => {
    const caclBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total');

    const countSum = () => {
        let total = 0,
            countValue = 1,
            dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,  //value выбранного селекта           
            squareValue = +calcSquare.value;
            // console.log('squareValue: ', !!squareValue); - так выведет true / false
            // console.log('typeValue: ', !!typeValue);
        
        if (calcCount.value > 1 ) {
            countValue += (calcCount.value - 1) / 10;
        }

        if (calcDay.value && calcDay.value < 5) {
            dayValue *= 2;
        } else if (calcDay.value && calcDay.value < 10) {
            dayValue *= 1.5;
        }

        if (typeValue && squareValue) {
            total = price * typeValue * squareValue * countValue * dayValue;
        }


        totalValue.textContent = total;
    };

    caclBlock.addEventListener('change', (event) => {
        const target = event.target;
        // if (target.matches('.calc-type') || target.matches('.calc-square') || target.matches('.calc-day') || target.matches('.calc-count')) {
        //     console.log('test');
        // }
        if (target === calcType || target === calcSquare || target === calcDay || target === calcCount ) {
           countSum();
        }

    });


};

export default calc;