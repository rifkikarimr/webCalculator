// input and clear 
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitForSecondNumber: false
};

function updateDisplay() {
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitForSecondNumber = false;
 }

//  menerapkan efek after input angka
 function inputDigit(digit) { 
     if(calculator.displayNumber === '0'){
         calculator.displayNumber = digit;
     }
     else {
        calculator.displayNumber += digit;
     }
 }

 const buttons = document.querySelectorAll(".button");
 for (let button of buttons) {
     button.addEventListener('click', function(event) {

        // get objek target
        const target = event.target;
        // button ac
        if (target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }
        // button inverse or (+/-)
        if(target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }
        // button equals (=)
        if(target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }
        // button operator (+,-,x,/)
        if(target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
     });


 }

//  fungsi operator
function handleOperator(operator) {
    if(!calculator.waitForSecondNumber) {
        calculator.operator = operator;
        calculator.waitForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
        
        // mengatur ulang nilai display
        calculator.displayNumber = '0';
    } else {
        alert('operartor sudah ditetapkan');
    }
}

 // fungsi inverse 
 function inverseNumber() {
     if(calculator.displayNumber === '0'){
         return;
     }

     calculator.displayNumber = calculator.displayNumber * -1;
 }

// fungsi euals 
function performCalculation() {
    if(calculator.firstNumber == null || calculator.operator == null) {
        alert('operator belum ditetapkan');
        return;
    }

    let result = 0;
    if(calculator.operator === '+') {
        result = parseFloat(calculator.firstNumber) + parseFloat(calculator.displayNumber);
    } else if (calculator.operator === '-') {
        result = parseFloat(calculator.firstNumber) - parseFloat(calculator.displayNumber);
    } else if (calculator.operator === 'x') {
        result = parseFloat(calculator.firstNumber) * parseFloat(calculator.displayNumber);
    } else if (calculator.operator === '/') {
        result = parseFloat(calculator.firstNumber) / parseFloat(calculator.displayNumber);
    } else if (calculator.operator === '%') {
        result = parseFloat(calculator.firstNumber) % parseFloat(calculator.displayNumber);
    }

    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}