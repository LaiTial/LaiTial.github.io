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

  if(nowNum=="0")
  {
    if(number=="0") return; // ex) 000 같이 0이 계속 들어오는 것을 막는다
    else {result = result.substring(0, result.length-1);} // ex) 03->3으로.
  }

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

function inCalc(index, calcResult) {
  numbers.splice(index, 2);
  opers.splice(index, 1);
  numbers.splice(index, 0, calcResult);
}

function multipleDivide() {
  var calcResult = 0;
  var multi = opers.length;
  var div = opers.length;

  //'/'이 있는 index number
  if (opers.includes('/')) {div = opers.indexOf('/');}
  //'x'이 있는 index number
  if (opers.includes('x')) {multi = opers.indexOf('x');}

  //'x'이 먼저 위치할 경우 calc
  if(multi < div)
  {
    calcResult = numbers[multi]*numbers[multi+1];
    inCalc(multi, calcResult);
  }

  //'/'이 먼저 위치할 경우 calc
  else {
    calcResult = numbers[div]/numbers[div+1];
    inCalc(div, calcResult);
  }
}

function addSub() {
  var calcResult = 0;

  if (opers[0]=='+') {calcResult = numbers[0]+numbers[1];}
  else {calcResult = numbers[0]-numbers[1];}

  inCalc(0, calcResult);
}

function getCalc() {
  var calcResult = 0;
  var calcNumber = opers.length;
  var nowCalcNum = 0;

  while (calcNumber > 0) {

    //나눗셈이나 곱셈이 있는 경우 그 calc method 호출
    if (opers.includes('x') || opers.includes('/')) {multipleDivide();}

    //덧셈, 뺄셈 calc method 호출
    else{addSub();}

    calcNumber -= 1;
  }
  calcResult = numbers.pop();
  return calcResult;
}

function calc() {
  var calcR;
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
    //계산 method 호출
    calcR = getCalc();
    clear();
    input.value=String(calcR);
  }
}

init();
