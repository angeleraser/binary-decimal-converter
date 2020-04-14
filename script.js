const INPUT = document.querySelector('#input');
const OUTPUT_1 = document.querySelector('#output1');
const OUTPUT_2 = document.querySelector('#output2');
const option$BinarySystem = document.querySelector('#binary-option');
const option$DecimalSystem = document.querySelector('#decimal-option');
const option$HexSystem = document.querySelector('#hexadecimal-option');
const optionList = document.querySelector('.optionList');
const optionBox = document.querySelector('.optionBox');
const OUTPUT_1$NAME = document.querySelector('.output1');
const OUTPUT_2$NAME = document.querySelector('.output2');
const deleteArrayComma = (arr)=>{
  let arrStr = arr.toString();
  let isCommaInclude = arrStr.includes(',');  
  while (isCommaInclude){
    arrStr = arrStr.replace(',','');
    isCommaInclude = arrStr.includes(',');
  }
  return arrStr;
}
const splitElements = (arr) =>{
  let splitedArray = [];
  arr.forEach( el =>{
    str = Number(el)
    splitedArray.push(el);
  })
  return splitedArray
}
function isNumber (value){
  value = Number (deleteArrayComma(value))
  let isNaNNumber = true; 
  if(!value){
    isNaNNumber = false;
  }
 return isNaNNumber;
}
class Converter {
  constructor(option){
    this.input = INPUT;
    this.output1 = OUTPUT_1;
    this.output2 = OUTPUT_2;
    this.option = option;
    this.system = this.option.value;
  }
  setConverter(){
    this.option.addEventListener('click', ()=>{
      this.setInputType(this.system);
      this.setOuputName(this.system)
      this.clearInputs();
      this.input.addEventListener('keyup',()=>{
        let INPUT_VALUE = this.input.value;
        if(INPUT_VALUE){
          this.outputValues(this.system,INPUT_VALUE);
        }
        else{
          this.clearInputs()
        }
      })
    })
  }
  outputValues(system,inputValue){
    switch (system) {
      case 'decimal':
        this.output1.value = convertFromDecimalTo(inputValue,'binary');
        this.output2.value = convertFromDecimalTo(inputValue,'hexadecimal');
        break;
      case 'binary':
        this.output1.value = convertToDecimalFrom(inputValue,system);
        this.output2.value = convertFromDecimalTo(convertToDecimalFrom(inputValue,system),'hexadecimal')
        break;
      case 'hexadecimal':
        this.output1.value = convertToDecimalFrom(inputValue,system);
        this.output2.value = convertFromDecimalTo(convertToDecimalFrom(inputValue,system),'binary');
        break
      default:
        break;
    }
  }
  clearInputs(){
    this.input.value = ''
    this.output1.value=''
    this.output2.value=''
  }
  setOuputName(system){
    switch (system) {
      case 'decimal':
        OUTPUT_1$NAME.innerHTML = this.getSystemName('binary');
        OUTPUT_2$NAME.innerHTML = this.getSystemName('hexadecimal')
        break;
      case 'binary':
        OUTPUT_1$NAME.innerHTML = this.getSystemName('decimal');
        OUTPUT_2$NAME.innerHTML = this.getSystemName('hexadecimal');
        break;
      case 'hexadecimal':
        OUTPUT_1$NAME.innerHTML = this.getSystemName('decimal');
        OUTPUT_2$NAME.innerHTML = this.getSystemName('binary')
        break 
      default:
        break;
    }
  }
  setInputType(system){
    if(system == 'hexadecimal'){
      this.input.setAttribute('type','text')
    }
    else{
      this.input.setAttribute('type','number')
    }
  }
  getSystemName = (system)=>{
    let name = null;
    switch (system) {
      case 'decimal':
        name = `DEC<sub>10</sub>`
        break;
       case 'binary':
         name = `BIN<sub>2</sub>` ;
        break;
        case 'hexadecimal':
          name = `HEX<sub>16</sub>`;
          break;
      default:
        break;
    }
    return name
  }
}
const convertFromDecimalTo = (number,system = 'decimal') =>{
  let quotientList = [];
  let quotient = null;
  let moduleList = [];
  let module = null;
  let digits = null;  
  let divisor = null;
  number = Number(number)
  number = number.toFixed(0);
 
  const toHexLetter = (arr) =>{
    let hexLetters = [];
    arr.forEach( (num)=>{
      let number = Number (num);
      let hexLetter = null;
      switch (number) {
        case 10:
          hexLetter = 'A'
          break;
        case 11:
          hexLetter = 'B'
          break
        case 12:
          hexLetter = 'C'
          break
        case 13:
          hexLetter = 'D'
          break
        case 14:
          hexLetter = 'E'
          break
        case 15:
          hexLetter = 'F'
          break
        default:
          hexLetter = number
          break;
      }
      hexLetters.push(hexLetter)
    })
    return hexLetters
  }
  const generateQuotient$Module = (number) =>{
    // Divisor 
    switch (system){
      case 'binary':
        divisor = 2;
        break;
      case 'hexadecimal':
        divisor = 16;
        break
    }
    module   = number % divisor;
    quotient = Math.floor(number/divisor)
    saveQuotient$ModuleDigits(quotient,module,quotientList,moduleList);
    switch(system){
      case 'binary':
        while (quotient !== 1) {
          generateQuotient$Module(quotient);
          }
        break;
      case 'hexadecimal':
        while (quotient > 16) {
          generateQuotient$Module(quotient);
        }  
    }
  }
  const saveQuotient$ModuleDigits = (quotient,module) => {
    quotientList.push(quotient);
    moduleList.unshift(module);
  }
  // Aqui se realiza la conversion 
  if(system !== 'decimal'){
    if(number >=2){
      generateQuotient$Module(number);
      if(system == 'hexadecimal'){
        quotientList = toHexLetter(quotientList);
        moduleList = toHexLetter(moduleList);
      }
      const lastQLDigit = quotientList.length - 1;
      // Primer digito del numero
      let firstDigit = quotientList[lastQLDigit];
      if( system == 'hexadecimal' && number < 16){
        firstDigit = ``
      }
      // siguientes digitos conformados por los modulos 
      let nextDigits = deleteArrayComma(moduleList);
      digits = `${firstDigit}${nextDigits}`;
      }
    // retorna el mismo numero porque no es necesario convertir 
    else{
         number >=0 ? digits = `${number}` : digits = ``;
      }
  } else{
    digits = number;
  }
  return digits
}
function convertToDecimalFrom(number,system = 'decimal') {

  const hexDigitsToDecimal = (arr) =>{
  let arrNumber = [];
  arr.forEach(digit =>{
    if(typeof digit == 'string'){
      digit = digit.toUpperCase();
      let number = digit;
      switch(digit){
        case 'A':
         number = 10;
         arrNumber.push(number)
         break;
        case 'B':
          number = 11;
          arrNumber.push(number)
          break;
        case 'C':
          number = 12;
          arrNumber.push(number)
          break;
        case 'D':
          number = 13;
          arrNumber.push(number)
          break;
        case 'E':
          number = 14;
          arrNumber.push(number)
          break;
        case 'F':
          number = 15;
          arrNumber.push(number)
          break; 
        default:
          arrNumber.push(number) 
      }
    }
    else{
      arrNumber.push(digit)
    }
  })
  
  return arrNumber;
  }
  const digitsToDecimal = (digits) => {
  let base = null;
  switch(typeOfNumber){
    case 'binary':
      base = 2;
      break;
    case 'hexadecimal':
      base = 16;
      break;
  }
  // Aqui se realiza la conversion 
  {
     //  numeros que van a ser sumados 
     const numbers = [];
     // exponente de la base 
     let exp = 0;
    //  Multiplica los digitos por la base y el exponente 
    (digits.reverse()).forEach( num =>{
     num = num * Math.pow(base,exp);
     numbers.push(num);
     exp++
   })
   if((isNumber(digits))){
    decimalNumber = numbers.reduce((a,b)=> a+b);
   }
  } 
   return decimalNumber;
  }
  let typeOfNumber = system;
  if(system == 'decimal'){
    decimalNumber = number;
  }
  else{
     // Convierte el numero (parametro) en un array de strings 
  let numberStr = [...number.toString()]; 
  let decimalNumber = '';
  let splitedNumbers = splitElements(numberStr);
  if(typeOfNumber == 'hexadecimal'){
    splitedNumbers = hexDigitsToDecimal(splitedNumbers)
  }
  decimalNumber = digitsToDecimal(splitedNumbers);
  }
  return decimalNumber;  
}
const includesHexLetter = (arr)=>{
  let isIncludes = false;
  if(arr.includes('A') || arr.includes('B') || arr.includes('C') ||
  arr.includes('D') || arr.includes('E') ||arr.includes('F') || arr.  includes('a') || arr.includes('b') || arr.includes('c') ||
  arr.includes('d') || arr.includes('e') ||arr.includes('f')){
  isIncludes = true;
}
return isIncludes;
}
const decimalOptionConverter = new Converter(option$DecimalSystem);
const binaryOptionConverter = new Converter(option$BinarySystem);
const hexOptionConverter = new Converter(option$HexSystem)
decimalOptionConverter.setConverter();
binaryOptionConverter.setConverter();
hexOptionConverter.setConverter();
option$DecimalSystem.click()

