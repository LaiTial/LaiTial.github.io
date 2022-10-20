
const buttons = document.querySelectorAll("button");
const input = document.querySelector("#resultD");

let result = "";
let nowNum = ""
let operCheck = false;

var numbers = []
var opers = []

function init() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      switch (button.dataset.type) {
        case "operator":
          const oper = button.innerText;
          operator(oper);
          break;
        case "ac":
          clear();
          break;
        case "equals":
          calc();
          break;
        default:
          const number = button.innerText;
          displayNumber(number);
          break;
      }
    });
  });
}

function displayNumber(number) {

  if(operCheck){
    numbers.push(Number(nowNum));
    nowNum="";

    //사용자가 0으로 나눗셈을 시행 시 경고
    if(number=="0" && opers[opers.length-1]==="/")
    {
      alert("Cannot be divided by zero");
      operCheck = false;
      return;
    }
  }

  operCheck = false;

  nowNum += number;
  result += number;
  input.value = result;
}

function operator(oper) {

  //맨 앞에 연산자가 오거나 연산자가 연달아 오지 않게 막는다
  if(operCheck || input.value === "0") {
    alert("Click number!");
    return;
  }

  opers.push(oper);
  operCheck = true;

  result += oper;
  input.value=result;
}

function clear() {
  input.value = 0;

  result = "";
  nowNum = "";
  operCheck = false;

  opers = [];
  numbers=[];
}

function getCalc() {
  if (opers.includes('*')) {
    alert("* is ok");
  }
  if (opers.includes('/')) {
    alert("/ is ok");
  }
}

function calc() {

  // 계산할 것이 있는지 확인
  if (input.value === "0") {
    clear();
  }

  // 마지막이 연산자로 끝나는지 check
  else if (operCheck) {
    clear();
    input.value = "The formula is not complete!"
  }

  else {
    //저장되지 못한 data가 있으면 저장
    if(nowNum != "")
    {
      numbers.push(Number(nowNum));
    }
    getCalc();
    clear();
  }
}

init();
