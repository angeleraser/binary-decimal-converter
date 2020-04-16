const INPUT = document.querySelector('#input');
const OUTPUT_1 = document.querySelector('#output1');
const OUTPUT_2 = document.querySelector('#output2');
const OUTPUT_1$NAME = document.querySelector('.output1');
const OUTPUT_2$NAME = document.querySelector('.output2');
const BIN_radioInput = document.querySelector('#binary-option');
const DEC_radioInput = document.querySelector('#decimal-option');
const HEX_radioInput = document.querySelector('#hexadecimal-option');
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
      this.setOuputName(this.system);
      this.clearInputs();
      this.input.addEventListener('keyup',()=>{
        let INPUT_VALUE = this.input.value;
        if(INPUT_VALUE){
          // Evitar que se coloquen numeros mayores que 1 
          if(BIN_radioInput.checked){
            [...INPUT_VALUE].forEach( dig =>{
              if(dig >1){
               this.input.value = this.input.value.replace(dig,'')
              }
            })
          } 
          // Todas las letras a mayuscula 
          else if(HEX_radioInput.checked){
            [...INPUT_VALUE].forEach( dig =>{
              this.input.value = this.input.value.replace(dig,dig.toUpperCase());
              if(dig == 1 || dig == 2 ||dig == 3 ||dig == 4 ||dig == 5 ||dig == 6 ||dig == 7 ||dig == 8 ||dig == 9 || dig == 0 || dig == 'A' ||dig == 'B' ||dig == 'C' ||dig == 'D' ||dig == 'E' ||dig == 'F' ){
                this.input.value = this.input.value;
              }
              else{
                this.input.value = this.input.value.replace(dig,'');
              }
            })
          }
          INPUT_VALUE = this.input.value;
          this.renderValues(this.system,INPUT_VALUE);
        }
        else{
          this.clearInputs()
        }
      })
    })
  }
  renderValues(system,inputValue){
    switch (system) {
      case 'decimal':
        this.output1.value = convertTo(inputValue,'binary');
        this.output2.value = convertTo(inputValue,'hexadecimal');
        break;
      case 'binary':
        this.output1.value = toDecimal(inputValue,system);
        this.output2.value = convertTo(toDecimal(inputValue,system),'hexadecimal')
        break;
      case 'hexadecimal':
        this.output1.value = toDecimal(inputValue,system);
        this.output2.value = convertTo(toDecimal(inputValue,system),'binary');
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
  setOuputName (system){
    switch (system) {
      case 'decimal':
        OUTPUT$NAME('binary','hexadecimal')
        break;
      case 'binary':
       OUTPUT$NAME('decimal','hexadecimal')
        break;
      case 'hexadecimal':
        OUTPUT$NAME('decimal','binary')
        break 
      default:
        break;
    }
  }
  setInputType(system){
    if(system == 'hexadecimal'){
      this.input.setAttribute('placeholder','hex number')
      this.input.setAttribute('type','text')
    }
    else{
      this.input.setAttribute('placeholder',`${system} number`)
      this.input.setAttribute('type','number')
    }
  }
}
const convertTo = (number,system = 'decimal') =>{
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
  const deleteArrayComma = (arr)=>{
    let arrStr = arr.toString();
    let isCommaInclude = arrStr.includes(',');  
    while (isCommaInclude){
      arrStr = arrStr.replace(',','');
      isCommaInclude = arrStr.includes(',');
    }
    return arrStr;
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
const toDecimal = (number,system = 'decimal') => {
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
    decimalNumber = numbers.reduce((a,b)=> a+b);
  } 
  }
  const splitElements = (arr) =>{
    let splitedArray = [];
    arr.forEach( el =>{
      str = Number(el)
      splitedArray.push(el);
    })
    return splitedArray
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
const OUTPUT$NAME = (output1,output2)=>{
  const getSystemName = (system)=>{
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
  OUTPUT_1$NAME.innerHTML = getSystemName(output1)
  OUTPUT_2$NAME.innerHTML = getSystemName(output2)
}
const DECIMAL_SYSTEM = new Converter(DEC_radioInput);
const BINARY_SYSTEM = new Converter(BIN_radioInput);
const HEXADECIMAL_SYSTEM = new Converter(HEX_radioInput);
DECIMAL_SYSTEM.setConverter();
BINARY_SYSTEM.setConverter();
HEXADECIMAL_SYSTEM.setConverter();
// Activa por defecto el convertidor del Sistema decimal 
DEC_radioInput.click();
