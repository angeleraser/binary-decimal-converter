class Converter {
  constructor(input,name){
    this.input = input;
    this.name = name;
  }
  convert(){
    this.input.addEventListener('keyup',()=>{
      let VALUE = this.replaceComma(this.input.value);
      if(VALUE){     
        allOutputs.forEach( out=>{
          if(out.name !== this.name){
           out.outputValue(VALUE);
          }
        })
      }
      else{
        allOutputs.forEach(out=>{
          if(out.name !== this.name){
            out.eraseCharacters()
           }
        })
      }
    })
  }
  replaceComma = (str)=>{
    str.replace(',','.')
    return (Number(str))
  }
}
class Output {
  constructor(systemName,output){
    this.name = systemName;
    this.output = output;
  }
  outputValue(number){
    this.output.value = convertTo(number,this.name)
  }
  eraseCharacters(){
    this.output.value = ''
  }
}
const decimalInput = document.querySelector('#decimal-input');
const binaryInput = document.querySelector('#binary-output');
const hexadecimalInput = document.querySelector('#hexadecimal-output');
const convertTo = (number,system) =>{
  let quotientList = [];
  let quotient = null;
  let moduleList = [];
  let module = null;
  let digits = null;  
  let divisor = null;
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
  const splitElements = (arr) =>{
    let splitedArray = [];
    arr.forEach( el =>{
      str = Number(el)
      splitedArray.push(el);
    })
    return splitedArray
  }
  // Aqui se realiza la conversion 
  {
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
  }
  return digits
}
const binaryOutput = new Output('binary',binaryInput);
const decimalOutput = new Output('decimal',decimalInput);
const hexOutput = new Output('hexadecimal',hexadecimalInput);
const allOutputs = [binaryOutput,decimalOutput,hexOutput];
const DECIMAL_INPUT = new Converter(decimalInput,'decimal');
DECIMAL_INPUT.convert();