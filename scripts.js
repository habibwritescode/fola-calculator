let firstOperand = document.querySelector('.first-operand');
let operator = document.querySelector('.show-operator');
let secondOperand = document.querySelector('.second-operand');
let showTotal = document.querySelector('.total');
let timeHours = document.querySelector('.hours');
let timeMinutes = document.querySelector('.minutes');
let deleteInput = document.querySelector('.delete');

const inputs = document.querySelectorAll('.input');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('.clear');
const equals = document.querySelector('.equals');

const prefixTimeWithZero = (i) => {
  if (i < 10){
    i = "0" + i
  };
  return i;
}

const startTime = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds()
  minutes = prefixTimeWithZero(minutes);

  timeHours.textContent = hours
  timeMinutes.textContent = `${minutes}`

  setTimeout(startTime, 500);
}

startTime()

const clearScreen = () => {
  firstOperand.textContent = '';
  operator.textContent = '';
  secondOperand.textContent = '';
  showTotal.textContent = '';
}

inputs.forEach( element => {
  element.addEventListener('click', function showInput() {
      if(!operator.textContent){
        firstOperand.textContent += element.textContent
      }else{
        secondOperand.textContent += element.textContent
      }
  })
})

operators.forEach( element => {
  element.addEventListener('click', function showOperator(){
    if(showTotal.textContent && showTotal.textContent !== 'error'){
      firstOperand.textContent = calculateTotal()
      showTotal.textContent = ''
      secondOperand.textContent = ''
    }
    operator.textContent = element.textContent
  })
})

deleteInput.addEventListener('click', function deleteInput(){
  if(secondOperand.textContent){
    secondOperand.textContent = secondOperand.textContent.slice(0, -1)
  }else if(operator.textContent){
    operator.textContent = ''
  }else{
    firstOperand.textContent = firstOperand.textContent.slice(0, -1)
  }
})

const multiply = (x, y) => {
  return x * y
}
const sum = (x, y) => {
  return x + y
}
const subtract = (x, y) => {
  return x - y
}
const divide = (x, y) => {
  return x / y
}

const calculateTotal = () => {
  let x = parseFloat(firstOperand.textContent);
  let y = parseFloat(secondOperand.textContent);
  let total = 0;

  switch(operator.textContent){
    case 'x':
      total = multiply(x, y)
      break;
    case '+':
      total = sum(x, y)
      break;
    case '-':
      total = subtract(x, y)
      break;
    case '/':
      total = divide(x, y)
      break;
    default:
      total = 0
  }

  if(isNaN(total)){
    showTotal.textContent = 'error'
  }else{
    showTotal.textContent = total.toFixed(2)
  }
  return total.toFixed(2);
}

clear.addEventListener('click', clearScreen)

equals.addEventListener('click', calculateTotal)
