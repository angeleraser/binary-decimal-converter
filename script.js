const binaryConverterInput = document.querySelector('#binary-input');
const binaryConverterOutput = document.querySelector('#binary-output');
const decimalConverterInput = document.querySelector('#decimal-input');
const decimalConverterOutput = document.querySelector('#decimal-output');
function toBinaryNumber (number){

  // Lista de cocientes y modulos para crear el numero 
  const quotientList = [];
  const moduleList = [];
  let binaryDigits = null;
  let module = null;
  let quotient = null;

  const generateQuotient$Module = (number) =>{
  
    const saveQuotient$ModuleDigits = (quotient,module) => {
      quotientList.push(quotient);
      moduleList.unshift(module);
    }
    module   = number % 2;
    quotient = Math.floor(number/2);
    saveQuotient$ModuleDigits(quotient,module);
  
    while (quotient !== 1) {
    generateQuotient$Module(quotient);
    }
  }
  // Aqui se realiza la conversion 
  {
    if( number >=2 ){

      generateQuotient$Module(number);
      const lastDigit = quotientList.length - 1;
      // Primer digito del numero binario 
      const firstDigit = quotientList[lastDigit];
      // Siguientes digitos conformados por los modulos 
      const nextDigits = deleteArrayComma(moduleList);
      binaryDigits = `${firstDigit}${nextDigits}`;

      }
      // retorna el mismo numero porque no es necesario convertir 
      else{
         number >=0 ? binaryDigits = `${number}` : binaryDigits = `¡SYNTAX ERROR!`;
      }
  }
  return binaryDigits
}
function toDecimalNumber(number) {

  // Convierte el numero en un array de strings 
  let numberStr = [...number.toString()]; 
  let decimalNumber = null;
  const splitElements = (arr) =>{
      let splitedArray = [];
      arr.forEach( el =>{
        str = Number(el)
        splitedArray.push(el);
      })
      return splitedArray
  }
  const digitsToDecimal = (digits) => {

    // Verifica que los digitos sean numeros 
    function isNumber (value){
  value = Number (deleteArrayComma(value))
  let isNaNNumber = true; 
  if(!value){
    isNaNNumber = false;
  }
  return isNaNNumber;
    }
     // exponente de la base 2 
     let exp = 0;
    //  numeros que van a ser sumados 
     const numbers = [];

     if(isNumber(digits)){
        //  Multiplica los digitos por la base 2 y el exponente 
     (digits.reverse()).forEach( num =>{
      num = num * Math.pow(2,exp);
      numbers.push(num);
      exp++
    })
      if(numbers.length > 0 && (numbers.reduce((a,b)=> a+b))){
       return numbers.reduce((a,b)=> a+b)
      }
     }
     else{
       return '¡SYNTAX ERROR!'
     }
  }
  // flag para ejecutar la operacion 
  const isBinaryDigit = (arr) => {
      let isBinary = true;  
      // para verificar si es una cifra binaria 
      arr.forEach( dig =>{
        if((dig !==1 || dig !==0) && (dig > 1)){ 
          console.log( typeof dig)  
          isBinary = false;
        }
      })   
      return isBinary
  }
  const splitedNumbers = splitElements(numberStr);
  isBinaryDigit(splitedNumbers) ? decimalNumber = digitsToDecimal(splitedNumbers) : decimalNumber = '¡Invalid binary number!'
  return decimalNumber;
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
class Converter {

  constructor(input,output,fn){
    this.input = input;
    this.output = output;
    this.callBack = fn;
    this.convert;
  }
  convert(){
   this.input.addEventListener('keyup', ()=>{  
    let inputValue = this.input.value;
    let outputValue = this.callBack(inputValue);

    // Si tiene caracteres 
    if(inputValue){
      this.output.value = outputValue; 
    }
    // sino se borran los que estaban 
    else{
      this.output.value = ""
    }
   })
  }
}
const binaryConverter = new Converter(binaryConverterInput,binaryConverterOutput,toBinaryNumber);
const decimalConverter = new Converter(decimalConverterInput,decimalConverterOutput,toDecimalNumber);
decimalConverter.convert()
binaryConverter.convert();
