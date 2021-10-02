let firstNum = "";
let secondNum = "";
let currentOperation = null;
let reset = false;

// elements and selectors
const numButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const decimalButton = document.getElementById("decimal");
const lastOperation = document.getElementById("lastOp");
const operationOnScreen = document.getElementById("currOp");

// event listeners
equalsButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNum);
decimalButton.addEventListener("click", appendDecimal);

numButtons.forEach(button =>
  button.addEventListener("click", () => appendNum(button.textContent))
);

operatorButtons.forEach(button =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

function appendNum(number) {
  if (operationOnScreen.textContent === "0" || reset) resetCalc();
  operationOnScreen.textContent += number;
}

// reset calculator
function resetCalc() {
  operationOnScreen.textContent = "";
  reset = false;
}

// clear calculator
function clear() {
  operationOnScreen.textContent = "0";
  lastOperation.textContent = "";
  firstNum = "";
  secondNum = "";
  currentOperation = null;
}

// decimal functionality
function appendDecimal() {
  if (reset) resetCalc();
  if (operationOnScreen.textContent === "") operationOnScreen.textContent = ".";
  if (operationOnScreen.textContent.includes(".")) return;
  operationOnScreen.textContent += ".";
}

// delete number
function deleteNum() {
  operationOnScreen.textContent = operationOnScreen.textContent
    .toString()
    .slice(0, -1);
}

// operation functionality
function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstNum = operationOnScreen.textContent;
  currentOperation = operator;
  lastOperation.textContent = `${firstNum} ${currentOperation}`;
  reset = true;
}

// evaluate operation
function evaluate() {
  if (currentOperation === null || reset) return;
  if (currentOperation === "÷" && operationOnScreen.textContent === "0") {
    alert("You can't divide by 0.");
    return;
  }
  secondNum = operationOnScreen.textContent;
  operationOnScreen.textContent = roundResult(
    operate(currentOperation, firstNum, secondNum)
  );
  lastOperation.textContent = `${firstNum} ${currentOperation} ${secondNum} =`;
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

// calculations, + - x /
function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

// operations, executes cases based on the user input
function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+":
      return add(a, b);
    case "−":
      return substract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}
