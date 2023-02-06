//Variables
let runningTotal = 0;
let buffer = "0";
let previousOperator;
//Sounds
let clickNum = new Audio('/sounds/clickNum.mp3');
clickNum.volume = 0.3;
let clickSymbol = new Audio('/sounds/clickSymbol.mp3');
clickSymbol.volume = 0.3;
//For keeping current number on display when pressing symbol
let currentlyCalculating = false;
//For erasing the number from previous calculation on press of a number
let calculationFinished = false;

//Screen
const screen= document.querySelector('.screen');

//Handle button click
function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

//When a symbol is pressed
function handleSymbol(symbol){
    clickSymbol.play();
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal = 0;
            currentlyCalculating = false;
            break;
        case '=':
            if(previousOperator === null){
                return
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            currentlyCalculating = false;
            calculationFinished = true;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            currentlyCalculating = false;
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

//When a number is pressed
function handleNumber(numberString){
    clickNum.play();
    if(buffer === "0" || currentlyCalculating === true || calculationFinished === true){
        buffer = numberString;
        currentlyCalculating = false;
        calculationFinished = false;
    }else{
        buffer += numberString;
    }
}

//Do calculation
function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(runningTotal === 0){
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    currentlyCalculating = true;
}

//Update running total based on symbol pressed
function flushOperation(intBuffer){
    if(previousOperator === '+'){
        runningTotal += intBuffer;
    }else if(previousOperator === '−'){
        runningTotal -= intBuffer;
    }else if(previousOperator === '×'){
        runningTotal *= intBuffer;
    }else if(previousOperator === '÷'){
        runningTotal /= intBuffer;
    }
}

//Initialize
function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();